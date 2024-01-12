import React, { useEffect, useState } from 'react'
import {BaseURL} from '../../Utils/Utils'
import { Avatar, Box, Skeleton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import UserSkeleton from '../common/UsersSkeleton/UserSkeleton';
import useFetch from '../../Hooks/useFetch';


function NewMemberInfos() {
    const {datas : users} = useFetch("users/all")
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
        :  <UserSkeleton listsToRender={4}/>
      }
    </Box>
  )
}

export default NewMemberInfos


