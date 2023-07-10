import { Box, CircularProgress } from "@mui/material";
import React from "react";
import ChartBar from "./ChartBar";

interface Props {
  isWorking: boolean;
  chartBarData: any;
}

const DataChart = ({ isWorking, chartBarData }: Props) => {
  return (
    <Box display='flex' flexDirection='column' alignSelf='center' width='65%'>
      {isWorking ? (
        <Box width={50} margin='auto'>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <ChartBar charData={chartBarData} />
      )}
    </Box>
  );
};

export default DataChart;
