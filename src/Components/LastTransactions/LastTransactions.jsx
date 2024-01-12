import { Avatar, Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";
import Toman from '../../assets/Images/svgs/toman-black.svg'
import useFetch from "../../Hooks/useFetch";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


function lastTransactions() {
    const {datas : transactions } = useFetch("transaction/all")
  return (
    <Box className="flex flex-col flex-[2] my-8 shadow-round p-2 rounded-lg">
      <h3 className="my-4"> تراکنش های اخیر</h3>
      {
        transactions.length ?   <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">نام و نام خانوادگی</TableCell>
              <TableCell align="center">تاریخ</TableCell>
              <TableCell align="center">مبلغ</TableCell>
              <TableCell align="center">وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0 , 6).map(
              ({ id, firstName, lastName, createdAt, price, status }) => (
                <StyledTableRow key={id}>
                  <TableCell component="th" scope="row" align="center" className="flex-center gap-1">
                    {firstName} {lastName}
                  </TableCell>
                  <TableCell align="center">{createdAt}</TableCell>
                  <TableCell align="center" className="flex-center gap-1 font-DanaBold">{price.toLocaleString()}
                  <img src={Toman} alt="ghorbani-dev.ir" className="size-5" />
                  </TableCell>
                  <TableCell align="center"><span className={`${status === "تکمیل شده" ? "bg-emerald-100 text-emerald-400" : status === "پرداخت نشده" ? "bg-amber-100 text-amber-400" : status === "پرداخت ناموفق" ? "bg-rose-100 text-rose-400" : "bg-gray-100 text-gray-400"} px-1 py-1 rounded-lg`}>{status}</span></TableCell>
                  
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer> : <ListSkeleton listsToRender={6}/>
      }
    
    </Box>
  );
}

export default lastTransactions;



const ListSkeleton = ({listsToRender}) => {
  return (
    <>
    {
      Array(listsToRender)
      .fill(1)
      .map((card, index) => (
        <React.Fragment key={index}> 
        
     <Skeleton animation="wave" className='w-full h-10'/>
               
          </React.Fragment>
        ))
      }
      </>
  );
};

export {ListSkeleton}