import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid ,faIR} from '@mui/x-data-grid';
import axios from 'axios';
import { BaseURL } from '../../Utils/Utils';
import UsersSkeleton from '../../Components/common/UsersSkeleton/UserSkeleton'
import { DeleteOutlineOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';


function Users() {
  const [users , setUsers] = useState([])
  const [getUsersData , setGetUsersData] = useState(false)


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
    },
    { 
      field: "deleteAction",
      headerName: 'حذف', width: 60 ,
      renderCell: (user) => {
        return (
            <div onClick={() => {deleteUserHandler(user.id)}} className="flex-center cursor-pointer text-rose-500">
                <DeleteOutlineOutlined />
             </div>
        );
     }
    },
  ]
  
  const deleteUserHandler = (userID) => {
      console.log(userID)
      Swal.fire({
        title: "آیا برای حذف کاربر مطمعن هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f43f5e",
        cancelButtonColor: "#0ea5e9",
        confirmButtonText: "تایید",
        cancelButtonText: 'انصراف'
      }).then((result) => {
        if (result.isConfirmed) {
         axios.delete(`${BaseURL}users/delete` , {
          headers : {
            authorization : userID
          }
         })
         .then(response => {
          toast.success('کاربر مورد نظر با موفقیت حذف گردید')
          setGetUsersData(prev => !prev)
          console.log(response)
         })
         .catch((error) => {
          toast.error('حذف کاربر انجام نشد')
          console.log(error)
         })
        }
      });
  }

  useEffect(() => {
  axios
  .get(`${BaseURL}users/all`)
  .then(response => setUsers(response.data))
  } , [getUsersData]);

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
      }} disableRowSelectionOnClick pageSizeOptions={[5]}/> :  <UsersSkeleton listsToRender={4}/>
     }
    </Box>
  )
}

export default Users
