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

function Products() {
  const [products , setProducts] = useState([])
  const [getProductsData , setGetProductsData] = useState(false)
  const [productID , setProductID] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateProductDialog, setShowUpdateProductDialog] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productImg, setProductImg] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productType, setProductType] = useState(false);
  const [productTitleNotValidError, setProductTitleNotValidError] =
    useState(false);
  const [priceNotValidError, setPriceNotValidError] = useState(false);
  const [discountPriceNotValidError, setDiscountPriceNotValidError] =
    useState(false);
    const [stockNotValidError, setStockNotValidError] =
    useState(false);
    const [productTypeNotValidError, setProductTypeNotValidError] =
    useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const columns = [ 
    {
      field: 'id',
      headerName: 'ردیف',
      width: 60,
    },
    {
      field: 'CREATED_AT',
      headerName: 'تاریخ ایجاد',
      width: 100,
    },
    {
      field: 'productImage',
      headerName: 'تصویر',
      width: 100,
      renderCell: (product) => {
        return (
          <img src={`${product.row.productImg}`} className='size-20 p-3 object-fill rounded-lg ' alt='ghorbani-dev.ir' />
        );
     }
    },
    {
      field: 'productTitle',
      headerName: ' عنوان',
      width: 450,
    },
    {
      field: 'productPrice',
      headerName: 'قیمت ',
      width: 150,
      renderCell: (product) => {
        return (
          <div className='text-gray-400 line-through'>
             {(product.row.price).toLocaleString()}
          </div>
        );
     }
    },
    {
      field: 'productDiscountPrice',
      headerName: 'قیمت با تخفیف',
      width: 150,
      renderCell: (product) => {
        return (
          <div className='flex-center gap-1'>
             {(product.row.price).toLocaleString()}
             <img src='src/assets/Images/svgs/toman-black.svg' className='size-4' alt='toman' />
          </div>
        );
     }
    },
    {
      field: 'stock',
      headerName: ' موجودی',
      width: 90,
    },
    {
      field: 'producttype',
      headerName: ' نوع محصول ',
      width: 100,
      renderCell: (product) => {
        return(
          product.row.productType ? "ساده" : "متغییر"
        )
     }
    },
    {
      field: 'editAction',
     headerName: 'ویرایش', width: 90 ,
    renderCell: (product) => {
      return (
          <div onClick={() => {
            setShowUpdateUserDialog(true)
            setUserID(product.id)
          }} className="flex-center cursor-pointer text-sky-500">
              <Edit />
           </div>
      );
   }
  },
    { 
      field: "deleteAction",
      headerName: 'حذف', width: 90 ,
      renderCell: (product) => {
        return (
            <div onClick={() => {deleteProductHandler(product.id)}} className="flex-center cursor-pointer text-rose-500">
                <DeleteOutlineOutlined />
             </div>
        );
     }
    },
  ]
  
  const deleteProductHandler = (productID) => {
    console.log(productID)
    Swal.fire({
      title: "آیا برای حذف محصول مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: 'انصراف'
    }).then((result) => {
      if (result.isConfirmed) {
       axios.delete(`${BaseURL}products/delete` , {
        headers : {
          authorization : productID
        }
       })
       .then(response => {
        toast.success('محصول مورد نظر با موفقیت حذف گردید')
        setGetProductsData(prev => !prev)
        console.log(response)
       })
       .catch((error) => {
        toast.error('حذف محصول انجام نشد')
        console.log(error)
       })
      }
    });
}

  useEffect(() => {
    axios
    .get(`${BaseURL}products/all`)
    .then(response => setProducts(response.data))
    } , [getProductsData]);


  return (
    <Box>
      <h2 className='font-MorabbaBold mb-8'>لیست محصولات</h2>
     {
      products.length ? <DataGrid rows={products.map((product,index)=>{return {id:index+1,...product}})} localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
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

export default Products
