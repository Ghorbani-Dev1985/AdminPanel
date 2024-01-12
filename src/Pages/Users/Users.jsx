import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Slide, TextField } from '@mui/material'
import { DataGrid ,faIR} from '@mui/x-data-grid';
import axios from 'axios';
import { BaseURL } from '../../Utils/Utils';
import UsersSkeleton from '../../Components/common/UsersSkeleton/UserSkeleton'
import { AccountCircle, AssignmentInd, DeleteOutlineOutlined, Edit, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import RtlProvider from '../../Components/common/RtlProvider/RtlProvider'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Users() {
  const [users , setUsers] = useState([])
  const [getUsersData , setGetUsersData] = useState(false)
  const [userID , setUserID] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [notFirstNameValidError, setFirstNameShowNotValidError] =
    useState(false);
  const [notLastNameValidError, setLastNameShowNotValidError] = useState(false);
  const [notTitleValidError, setTitleShowNotValidError] =
    useState(false);
    const [notUserNameValidError, setUserNameShowNotValidError] =
    useState(false);
    const [notPasswordValidError, setPasswordShowNotValidError] =
    useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
      width: 200,
    },
    {
      field: 'userName',
      headerName: 'نام کاربری',
      width: 250,
    },
    {
      field: 'title',
      headerName: 'عنوان تخصص ',
      width: 400,
    },
    {
      field: 'editAction',
     headerName: 'ویرایش', width: 120 ,
    renderCell: (user) => {
      return (
          <div onClick={() => {
            setShowUpdateUserDialog(true)
            setUserID(user.id)
          }} className="flex-center cursor-pointer text-sky-500">
              <Edit />
           </div>
      );
   }
  },
    { 
      field: "deleteAction",
      headerName: 'حذف', width: 120 ,
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
  
  const firstNameInputHandler = (event) => {
    setFirstName(event.target.value);
    if (firstName.length < 3) {
      setFirstNameShowNotValidError(true);
    } else {
      setFirstNameShowNotValidError(false);
    }
  };
  const lastNameInputHandler = (event) => {
    setLastName(event.target.value);
    if (lastName.length < 3) {
      console.log(lastName.length);
      setLastNameShowNotValidError(true);
    } else {
      setLastNameShowNotValidError(false);
    }
  };
  const titleInputHandler = (event) => {
    setTitle(event.target.value);
    if (title.length < 2) {
      setTitleShowNotValidError(true);
    } else {
      setTitleShowNotValidError(false);
    }
  };
  const userNameInputHandler = (event) => {
    setUserName(event.target.value)
    if (userName.length < 6) {
      setUserNameShowNotValidError(true);
    } else {
      setUserNameShowNotValidError(false);
    }
  };
 const passwordInputHandler = (event) => {
  setPassword(event.target.value)
    if (password.length < 8) {
      setPasswordShowNotValidError(true);
    } else {
      setPasswordShowNotValidError(false);
    }
  };
   
  const userUpdateHandler = async () => {
    let userUpdateInfos = {
      firstName,
      lastName,
      title,
      userName,
      password,
    };
    if (firstName && lastName && userName && title && password && firstName.length > 3 && lastName.length > 3 && title.length > 2 && userName.length > 6 && password.length > 8) {
      console.log(userUpdateInfos)
 await axios
    .put(`${BaseURL}users/update` , userUpdateInfos , {
      headers : {
        authorization : userID
      }
    })
    .then(response => {
      toast.success("  کاربر مورد نظر با موفقیت ویرایش گردید");
      setShowUpdateUserDialog(false)
      setGetUsersData(prev => !prev)
      setFirstName('')
          setLastName('')
          setTitle('')
          setUserName('')
          setPassword('')
      console.log(response)
    })
    .catch((error) => {
      toast.error(" ویرایش کاربر انجام نشد");
      console.log(error);
    });
    }else{
      toast.error("لطفا فرم را تکمیل نمایید");
    }
   
  }

  useEffect(() => {
  axios
  .get(`${BaseURL}users/all`)
  .then(response => setUsers(response.data))
  } , [getUsersData]);

    // Show edit user infos in dialog form
    useEffect(() => {
      console.log(userID)
      let filteredUpdateUser = users.find(user => user._id === userID)
      console.log(filteredUpdateUser)
      if(filteredUpdateUser){
        setFirstName(filteredUpdateUser.firstName)
        setLastName(filteredUpdateUser.lastName)
        setTitle(filteredUpdateUser.title)
        setUserName(filteredUpdateUser.userName)
        setPassword(filteredUpdateUser.password)
      }
    }, [userID])
  return (
    <>
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
    <RtlProvider>
 {/* Edit User Dialog */}
 <Dialog
        open={showUpdateUserDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowUpdateUserDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className='flex-center !font-MorabbaBold'>{" ویرایش اطلاعات کاربر"}</DialogTitle>
          <form className='w-full'>
        <DialogContent className='flex flex-col gap-4'>      
        <TextField
                  id="RegisterFirstName"
                  value={firstName}
                  onChange={(event) => firstNameInputHandler(event)}
                  autoComplete='off'
                  label={
                    <span>
                      نام <span className="text-rose-500 text-sm">*</span>
                    </span>
                  }
                  error={notFirstNameValidError && true}
                  helperText={
                    notFirstNameValidError && (
                      <span className="text-rose-500">
                        لطفا حداقل سه کاراکتر وارد نمایید
                      </span>
                    )
                  }
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <Person />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="RegisterLastName"
                  value={lastName}
                  onChange={(event) => lastNameInputHandler(event)}
                  autoComplete='off'
                  label={
                    <span>
                      نام خانوادگی{" "}
                      <span className="text-rose-500 text-sm">*</span>
                    </span>
                  }
                  error={notLastNameValidError && true}
                  helperText={
                    notLastNameValidError && (
                      <span className="text-rose-500">
                        لطفا حداقل چهار کاراکتر وارد نمایید
                      </span>
                    )
                  }
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <Person />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="RegisterLastName"
                  value={title}
                  onChange={(event) => titleInputHandler(event)}
                  autoComplete='off'
                  label={
                    <span>
                      عنوان
                      <span className="text-rose-500 text-sm">*</span>
                    </span>
                  }
                  error={notTitleValidError && true}
                  helperText={
                    notTitleValidError && (
                      <span className="text-rose-500">
                        لطفا حداقل یازده عدد وارد نمایید
                      </span>
                    )
                  }
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <AssignmentInd />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="RegisterUserName"
                  value={userName}
                  onChange={(event) => userNameInputHandler(event)}
                  autoComplete='off'
                  label={
                    <span>
                      نام کاربری
                      <span className="text-rose-500 text-sm">*</span>
                    </span>
                  }
                  variant="outlined"
                  size="small"
                  error={notUserNameValidError && true}
                  helperText={
                    notUserNameValidError && (
                      <span className="text-rose-500">
                        لطفا حداقل شش کاراکتر وارد نمایید
                      </span>
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <AccountCircle />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="RegisterPassword"
                  value={password}
                  onChange={(event) => passwordInputHandler(event)}
                  type={showPassword ? "text" : "password"}
                  label={
                    <span>
                      کلمه عبور <span className="text-rose-500 text-sm">*</span>
                    </span>
                  }
                  variant="outlined"
                  size="small"
                  error={notPasswordValidError && true}
                  helperText={
                    notPasswordValidError && (
                      <span className="text-rose-500">
                        لطفا حداقل هشت کاراکتر وارد نمایید
                      </span>
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateUserDialog(false)} className='!text-zinc-800'>انصراف</Button>
          <Button onClick={() => userUpdateHandler()}>ثبت</Button>
        </DialogActions>
          </form>
      </Dialog>
    </RtlProvider>
          </>
  )
}

export default Users
