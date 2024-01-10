import React, { useEffect, useState } from 'react'
import {BaseURL} from '../../Utils/Utils'
import { Avatar, Box, Skeleton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';


function NewMemberInfos() {
    const [users , setUsers] = useState([])
    let showLoading = 4
    useEffect(() => {
    axios
    .get(`${BaseURL}users/all`)
    .then(response => setUsers(response.data))
    } , [users]);
    
  return (
    <Box className="flex flex-col flex-1 my-8 shadow-round p-2 rounded-lg">
      <h3 className='my-4'>کاربران جدید</h3>
      {
        users.length ?
        users.slice(0 , 4).map(({id, userName ,title}) => {
            return(
                <div key={id} className='flex-between bg-violet-100/0 border border-gray-100 border-solid rounded-lg p-2 my-2'>
                   <p className='flex-center'><AccountCircleIcon className='size-12 text-zinc-400'/></p>
                   <div className='flex flex-col items-center gap-2'>
                    <p className='font-DanaBold'>{userName}</p>
                    <p>{title}</p>
                   </div>
                   <p className='flex-center size-10 bg-gray-100 rounded-lg'><VisibilityIcon /></p>
                </div>
            )
        })
        :  <ListSkeleton listsToRender={4}/>
      }
    </Box>
  )
}

export default NewMemberInfos


const ListSkeleton = ({listsToRender}) => {
  return (
    <>
    {
      Array(listsToRender)
      .fill(1)
      .map((card, index) => (
        <React.Fragment key={index}> 
          <div className='w-full flex-center gap-1 my-4'>
          <Skeleton variant="circular">
          <Avatar />
        </Skeleton> <Skeleton animation="wave" className='w-full h-12'/>
               </div>
          </React.Fragment>
        ))
      }
      </>
  );
};

export {ListSkeleton}