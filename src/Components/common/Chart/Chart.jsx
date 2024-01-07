import { Box } from '@mui/material'
import React from 'react'
import {ResponsiveContainer , LineChart , Line , XAxis , CartesianGrid, Tooltip} from 'recharts'


function Chart({title , data , dataKey , grid}) {
  return (
    <Box>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={data}>
            <XAxis dataKey="name" stroke='#5550bd'/>
            <Line dataKey={dataKey} stroke='#5550bd'/>
            <Tooltip />
            {
                grid && <CartesianGrid stroke='#c0dfdf' strokeDasharray="10" />
            }
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default Chart
