import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Slide,
  TextField,
} from "@mui/material";
import { DataGrid, faIR } from "@mui/x-data-grid";
import axios from "axios";
import { BaseURL } from "../../Utils/Utils";
import UsersSkeleton from "../../Components/common/UsersSkeleton/UserSkeleton";
import {
  AccountCircle,
  AssignmentInd,
  DeleteOutlineOutlined,
  Edit,
  Image,
  Inventory,
  MonetizationOn,
  MoneyOff,
  Person,
  Subtitles,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import RtlProvider from "../../Components/common/RtlProvider/RtlProvider";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Products() {
  const [products, setProducts] = useState([]);
  const [getProductsData, setGetProductsData] = useState(false);
  const [productID, setProductID] = useState("");
  const [showUpdateProductDialog, setShowUpdateProductDialog] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productImg, setProductImg] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productType, setProductType] = useState(false);
  const [productTitleNotValidError, setProductTitleNotValidError] =
    useState(false);
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 60,
    },
    {
      field: "CREATED_AT",
      headerName: "تاریخ ایجاد",
      width: 100,
    },
    {
      field: "productImage",
      headerName: "تصویر",
      width: 100,
      renderCell: (product) => {
        return (
          <img
            src={`${product.row.productImg}`}
            className="size-20 p-3 object-fill rounded-lg "
            alt="ghorbani-dev.ir"
          />
        );
      },
    },
    {
      field: "productTitle",
      headerName: " عنوان",
      width: 450,
    },
    {
      field: "productPrice",
      headerName: "قیمت ",
      width: 150,
      renderCell: (product) => {
        return (
          <div className="text-gray-400 line-through">
            {product.row.price.toLocaleString()}
          </div>
        );
      },
    },
    {
      field: "productDiscountPrice",
      headerName: "قیمت با تخفیف",
      width: 150,
      renderCell: (product) => {
        return (
          <div className="flex-center gap-1">
            {product.row.price.toLocaleString()}
            <img
              src="src/assets/Images/svgs/toman-black.svg"
              className="size-4"
              alt="toman"
            />
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: " موجودی",
      width: 90,
    },
    {
      field: "producttype",
      headerName: " نوع محصول ",
      width: 100,
      renderCell: (product) => {
        return product.row.productType ? "متغییر" : "ساده";
      },
    },
    {
      field: "editAction",
      headerName: "ویرایش",
      width: 90,
      renderCell: (product) => {
        return (
          <div
            onClick={() => {
              setShowUpdateProductDialog(true);
              setProductID(product.id);
            }}
            className="flex-center cursor-pointer text-sky-500"
          >
            <Edit />
          </div>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "حذف",
      width: 90,
      renderCell: (product) => {
        return (
          <div
            onClick={() => {
              deleteProductHandler(product.id);
            }}
            className="flex-center cursor-pointer text-rose-500"
          >
            <DeleteOutlineOutlined />
          </div>
        );
      },
    },
  ];

  const deleteProductHandler = (productID) => {
    console.log(productID);
    Swal.fire({
      title: "آیا برای حذف محصول مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#0ea5e9",
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BaseURL}products/delete`, {
            headers: {
              authorization: productID,
            },
          })
          .then((response) => {
            toast.success("محصول مورد نظر با موفقیت حذف گردید");
            setGetProductsData((prev) => !prev);
            console.log(response);
          })
          .catch((error) => {
            toast.error("حذف محصول انجام نشد");
            console.log(error);
          });
      }
    });
  };

  const productTitleInputHandler = (event) => {
    setProductTitle(event.target.value);
    if (productTitle.length < 3) {
      setProductTitleShowNotValidError(true);
    } else {
      setProductTitleShowNotValidError(false);
    }
  };

  const userUpdateHandler = async () => {
    let productUpdateInfos = {
      productTitle,
      productImg,
      price,
      stock,
      discountPrice,
      productType,
    };
    if (
      productTitle &&
      price &&
      discountPrice &&
      stock &&
      productTitle.length > 3
    ) {
      console.log(productUpdateInfos);
      await axios
        .put(`${BaseURL}products/update`, productUpdateInfos, {
          headers: {
            authorization: productID,
          },
        })
        .then((response) => {
          toast.success("  محصول مورد نظر با موفقیت ویرایش گردید");
          setShowUpdateProductDialog(false);
          setGetProductsData((prev) => !prev);
          setProductTitle("");
          setProductImg("");
          setPrice("");
          setStock("");
          setDiscountPrice("");
          setProductType("");
          console.log(response);
        })
        .catch((error) => {
          toast.error(" ویرایش محصول انجام نشد");
          console.log(error);
        });
    } else {
      toast.error("لطفا فرم را تکمیل نمایید");
    }
  };

  useEffect(() => {
    axios
      .get(`${BaseURL}products/all`)
      .then((response) => setProducts(response.data));
  }, [getProductsData]);

  // Show edit product infos in dialog form
  useEffect(() => {
    let filteredUpdateProduct = products.find(
      (product) => product._id === productID
    );
    if (filteredUpdateProduct) {
      setProductTitle(filteredUpdateProduct.productTitle);
      setProductImg(filteredUpdateProduct.productImg);
      setPrice(filteredUpdateProduct.price);
      setStock(filteredUpdateProduct.stock);
      setDiscountPrice(filteredUpdateProduct.discountPrice);
      setProductType(filteredUpdateProduct.productType);
    }
  }, [productID]);

  return (
    <>
      <Box>
        <h2 className="font-MorabbaBold mb-8">لیست محصولات</h2>
        {products.length ? (
          <DataGrid
            rows={products.map((product, index) => {
              return { id: index + 1, ...product };
            })}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
          />
        ) : (
          <UsersSkeleton listsToRender={4} />
        )}
      </Box>
      <RtlProvider>
        {/* Edit Product Dialog */}
        <Dialog
          open={showUpdateProductDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setShowUpdateProductDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className="flex-center !font-MorabbaBold">
            {" ویرایش اطلاعات محصول"}
          </DialogTitle>
          <form className="w-full">
            <DialogContent className="flex flex-col gap-4">
              <TextField
                id="RegisterProductTitle"
                value={productTitle}
                onChange={(event) => productTitleInputHandler(event)}
                autoComplete="off"
                label={
                  <span>
                    عنوان محصول <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                error={productTitleNotValidError && true}
                helperText={
                  productTitleNotValidError && (
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
                        <Subtitles />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="RegisterproductImg"
                value={productImg}
                onChange={(event) => setProductImg(event.target.value)}
                autoComplete="off"
                label={<span>تصویر</span>}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Image />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="price"
                value={price.toLocaleString()}
                onChange={(event) => setPrice(event.target.value)}
                autoComplete="off"
                size="small"
                label={
                  <span>
                    قیمت
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <MonetizationOn />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="RegisterDiscountPrice"
                value={discountPrice.toLocaleString()}
                onChange={(event) => setDiscountPrice(event.target.value)}
                autoComplete="off"
                size="small"
                label={
                  <span>
                    قیمت با تخفیف
                    <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <MoneyOff />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="RegisterPassword"
                value={stock}
                size="small"
                type="number"
                onChange={(event) => setStock(event.target.value)}
                label={
                  <span>
                    موجودی <span className="text-rose-500 text-sm">*</span>
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Inventory />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box className="flex-center gap-2">
                <FormLabel id="demo-controlled-radio-buttons-group">
                  نوع محصول
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={productType}
                  onChange={(event) => setProductType(event.target.value)}
                >
                  <Box className="flex-center">
                    <FormControlLabel
                      value={false}
                      onChange={(event) => setProductType(event.target.value)}
                      control={<Radio />}
                      label="ساده"
                    />
                    <FormControlLabel
                      value={true}
                      onChange={(event) => setProductType(event.target.value)}
                      control={<Radio />}
                      label="متغییر"
                    />
                  </Box>
                </RadioGroup>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowUpdateProductDialog(false)}
                className="!text-zinc-800"
              >
                انصراف
              </Button>
              <Button onClick={() => userUpdateHandler()}>ثبت</Button>
            </DialogActions>
          </form>
        </Dialog>
      </RtlProvider>
    </>
  );
}

export default Products;
