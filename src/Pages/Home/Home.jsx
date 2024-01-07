import { AddBox } from "@mui/icons-material";
import React from "react";
import { Box } from "@mui/material";
import Features from "../../Components/Features/Features";
import Chart from "../../Components/common/Chart/Chart";
import {xAxiosData} from '../../Utils/Utils'

function HomePage() {
  return (
    <>
    
     <Features />
    <Chart grid title="فروش ماهانه" data={xAxiosData} dataKey="Sale" />
    </>
  );
}

export default HomePage;
