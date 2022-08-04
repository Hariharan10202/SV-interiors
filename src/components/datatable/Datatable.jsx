import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

import ReactLoading from 'react-loading';

const Datatable = ({ path, columns, title }) => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realtime
    try {
      const collectionName = path === 'products' ? 'products' : 'users';
      const unsub = onSnapshot(collection(db, collectionName), snapShot => {
        let list = [];
        snapShot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        path === 'products' ? setProductData(list) : setData(list);
        setIsLoading(false);
        return;
      });
      return () => {
        unsub();
      };
    } catch (error) {
      console.log(error);
    }
  }, [path]);

  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <div className='cellAction'>
            <Link to={`/${path}/${params.row.id}`} style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {title}
        <Link to={`/${path}/new`} className='link'>
          Add New
        </Link>
      </div>
      {!isLoading ? (
        <DataGrid
          className='datagrid'
          rows={path === 'products' ? productData : data}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      ) : (
        <ReactLoading className='loading' type='bars' color='black' />
      )}
    </div>
  );
};

export default Datatable;
