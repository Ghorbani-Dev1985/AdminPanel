import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid ,faIR} from '@mui/x-data-grid';
import axios from 'axios';
import { BaseURL } from '../../Utils/Utils';
import UsersSkeleton from '../../Components/common/UsersSkeleton/UserSkeleton'
const columns = [ 
  {
    field: 'id',
    headerName: 'ردیف',
    width: 60,
  },
  {
    field: 'firstName',
    headerName: 'نام',
    width: 100,
  },
  {
    field: 'lastName',
    headerName: 'نام خانوادگی',
    width: 150,
  },
  {
    field: 'userName',
    headerName: 'نام کاربری',
    width: 190,
  },
  {
    field: 'title',
    headerName: 'عنوان تخصص ',
    width: 300,
  }
]

function Users() {
  const [users , setUsers] = useState([])
  useEffect(() => {
  axios
  .get(`${BaseURL}users/all`)
  .then(response => setUsers(response.data))
  } , []);

  return (
    <Box>
      <h2 className='font-MorabbaBold mb-8'>لیست کاربران</h2>
     {
      users.length ? <DataGrid rows={users.map((user,index)=>{return {id:index+1,...user}})} localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
       getRowId={(row) => row._id} columns={columns}  initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }} disableRowSelectionOnClick pageSizeOptions={5} /> :  <UsersSkeleton listsToRender={4}/>
     }
    </Box>
  )
}

export default Users
