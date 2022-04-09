import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const piechartColors = ["#777aca", "#5156be"];
  const series = [127, 205];
  const options = {
    chart: {
      width: 227,
      height: 227,
      type: "pie",
    },
    labels: ["Overdue Approvals", "Total Users"],
    colors: piechartColors,
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart options={options} series={series} type="pie" height="227" />
  );
};

export default PieChart;
