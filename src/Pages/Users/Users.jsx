import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { BaseURL } from '../../Utils/Utils';
import UsersSkeleton from '../../Components/common/UsersSkeleton/UserSkeleton'
const columns = [ 
  {
    field: 'id',
    headerName: 'ردیف',
    with: 40,
  },
  {
    field: 'firstName',
    headerName: 'نام',
    with: 100,
  },
  {
    field: 'lastName',
    headerName: 'نام خانوادگی',
    with: 150,
  },
  {
    field: 'userName',
    headerName: 'نام کاربری',
    with: 190,
  },
  {
    field: 'title',
    headerName: 'عنوان تخصص ',
    with: 300,
  }
]

function Users() {
  const [users , setUsers] = useState([])
  useEffect(() => {
  axios
  .get(`${BaseURL}users/all`)
  .then(response => setUsers(response.data))
  } , []);
  console.log(users)

  return (
    <Box>
      <h2 className='font-MorabbaBold mb-8'>لیست کاربران</h2>
     {
      users.length ? <DataGrid rows={users.map((user,index)=>{return {id:index+1,...user}})}  localeText={{
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) =>
            `${from} - ${to} از ${count} کاربر`,
        },
      }} getRowId={(row) => row._id} columns={columns}  initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }} disableRowSelectionOnClick pageSizeOptions={5}/> :  <UsersSkeleton listsToRender={4}/>
     }
    </Box>
  )
}

export default Users
