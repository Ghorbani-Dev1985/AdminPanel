import React, { useEffect, useState } from 'react'
import Toman from '../../assets/Images/svgs/toman-black.svg'
import { Box } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function Features() {
    return (
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <Feature title="قیمت" number="125000" percent="+2.4"/>
      <Feature title="فروش" number="6325000" percent="−3.1"/>
      <Feature title="درآمد" number="325000" percent="-1.2"/>
    </Box>
  )
}

export default Features


const Feature = ({title , number , percent  }) => {
    return(
      <Box className="bg-white shadow rounded-lg p-2">
      <p className='font-MorabbaBold text-3xl text-zinc-700 mb-2'>{title}</p>
      <Box className="w-full flex-between my-3">
       <span className='flex items-center font-DanaBold dir-ltr'>  
       {percent}
        {
            +percent > 0 ?  <ArrowUpwardIcon className='text-emerald-500'/> : <ArrowDownwardIcon className='text-rose-500'/>
        }
       </span>
       <span className='flex-center gap-1 font-DanaBold text-3xl'> {(+number).toLocaleString()} <img src={Toman} alt='ghorbani-dev.ir' className='size-5' /></span>
      </Box>
      <p className='text-gray-300 text-center'>مقایسه با ماه گذشته</p>
      </Box>
    )
}

export {Feature}