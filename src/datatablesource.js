import blankProfile from './Image/blank-profile-picture-973460_1280.webp';

export const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'user',
    headerName: 'User',
    width: 230,
    renderCell: params => {
      return (
        <div className='cellWithImg'>
          <img
            className='cellImg'
            src={params.row.img ? params.row.img : blankProfile}
            alt='avatar'
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },

  {
    field: 'address',
    headerName: 'Address',
    width: 100,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 160,
    renderCell: params => {
      return <div className={`cellWithStatus ${params.row.status}`}>{params.row.phone}</div>;
    },
  },
];

export const productColumns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'Landmark Name',
    headerName: 'Landmark Name',
    width: 230,
    renderCell: params => {
      return (
        <div className='cellWithImg'>
          <img
            className='cellImg'
            src={params.row.posterImg ? params.row.posterImg : blankProfile}
            alt='avatar'
          />
          {params.row['Landmark Name']}
        </div>
      );
    },
  },
  {
    field: 'Address',
    headerName: 'Address',
    width: 230,
  },

  {
    field: 'Location',
    headerName: 'Location',
    width: 100,
  },
  {
    field: 'place',
    headerName: 'Place',
    width: 160,
    renderCell: params => {
      return <div>{params.row.place}</div>;
    },
  },
];
