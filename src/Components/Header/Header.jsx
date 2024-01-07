import { Avatar, Badge, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import UserImg from '../../assets/Images/github.png'
function Header() {
  return (
    <header className='p-4 sticky top-0 z-50 bg-white/10 backdrop-blur-sm border-0 border-b border-b-gray-50 border-solid'>
      <Box className="container">
        <Box className="flex-between">
         <h1 className='font-MorabbaBold'>پنل کاربری</h1>
         <Box className="flex-center gap-2">
      <Badge badgeContent={4} color='error'>
        <NotificationsIcon color="action" />
      </Badge>
      <Badge badgeContent={2} color="error">
        <LanguageIcon color="action" />
      </Badge>
        <SettingsIcon className='text-zinc-800'/>
        <Avatar alt="ghorbani-dev.ir" src={UserImg} />
         </Box>
        </Box>
      </Box>
    </header>
  )
}

export default Header
