import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import ReactLoading from 'react-loading';

const Single = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const id = useParams().userId;
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {};
  }, [id]);

  console.log(data);

  return (
    <div className='single'>
      <Sidebar />
      <div className='singleContainer'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='editButton'>Edit</div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              {!loading ? (
                <>
                  <img src={data.img} alt='' className='itemImg' />
                  <div className='details'>
                    <h1 className='itemTitle'>{data.name}</h1>
                    <div className='detailItem'>
                      <span className='itemKey'>Email:</span>
                      <span className='itemValue'>{data.email}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Phone:</span>
                      <span className='itemValue'>{data.phone}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Address:</span>
                      <span className='itemValue'>{data.address}</span>
                    </div>
                    <div className='detailItem'>
                      <span className='itemKey'>Country:</span>
                      <span className='itemValue'>{data.country}</span>
                    </div>
                  </div>
                </>
              ) : (
                <ReactLoading className='loading' type='spin' color='#856b6b' />
              )}
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending ( Last 6 Months)' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
