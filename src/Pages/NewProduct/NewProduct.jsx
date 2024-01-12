import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import RtlProvider from '../../Components/common/RtlProvider/RtlProvider'
import { Inventory, MonetizationOn, MoneyOff, Subtitles , Image} from '@mui/icons-material';
import { BaseURL } from '../../Utils/Utils';
import axios from 'axios';
import toast from 'react-hot-toast';

function NewProduct() {
  const [productTitle, setProductTitle] = useState("");
  const [productImg, setProductImg] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productType, setProductType] = useState(false);
  const [productTitleNotValidError, setProductTitleNotValidError] =
  useState(false);
  const productTitleInputHandler = (event) => {
    setProductTitle(event.target.value);
    if (productTitle.length < 3) {
      setProductTitleNotValidError(true);
    } else {
      setProductTitleNotValidError(false);
    }
  };
  const newProductHandler = async (event) => {
    event.preventDefault()
    let newProductInfos = {
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
      await axios
        .post(`${BaseURL}products/newProduct`, newProductInfos)
        .then((response) => {
          toast.success("  محصول مورد نظر با موفقیت ثبت گردید");
          setProductTitle("");
          setProductImg("");
          setPrice("");
          setStock("");
          setDiscountPrice("");
          setProductType("");
          console.log(response);
        })
        .catch((error) => {
          toast.error("  محصول جدید ثبت نشد");
          console.log(error);
        });
    } else {
      toast.error("لطفا فرم را تکمیل نمایید");
    }
  }
  return (
    <Box>
            <RtlProvider>
            <h2 className="font-MorabbaBold mb-8"> افزودن محصول</h2>
          <form onSubmit={newProductHandler} className="w-full flex-center">
            <Box className="w-full max-w-lg flex flex-col gap-5"> 
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
                variant="filled"
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
                variant="filled"
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
                type='number'
                variant="filled"
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
                type='number'
                variant="filled"
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
                variant="filled"
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
              <Button type='submit' variant="contained">ثبت محصول جدید</Button>
          </Box>
          </form>
      </RtlProvider>
    </Box>
  )
}

export default NewProduct
