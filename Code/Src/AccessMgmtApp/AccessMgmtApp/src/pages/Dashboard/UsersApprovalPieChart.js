import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = (dData) => {
  const piechartColors = [
    "#00b894",
    "#19e9c0",
    "#d63031",
    "#777aca",
    "#5156be",
  ];
  const series = [
    dData?.data?.monthlyEmployeeAdded !== undefined
      ? dData?.data?.monthlyEmployeeAdded
      : 0,
    dData?.data?.approvedEmployees !== undefined
      ? dData?.data?.approvedEmployees
      : 0,
    dData?.data?.rejectedEmployees !== undefined
      ? dData?.data?.rejectedEmployees
      : 0,
    dData?.data?.pendingEmployees !== undefined
      ? dData?.data?.pendingEmployees
      : 0,
    dData?.data?.overdueEmployees !== undefined
      ? dData?.data?.overdueEmployees
      : 0,
  ];
  const options = {
    chart: {
      width: 227,
      height: 227,
      type: "pie",
    },
    labels: [
      "Users Added",
      "users approved",
      "users rejected",
      "approval pending",
      "approval over due",
    ],
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
    <ReactApexChart
      options={options || []}
      series={series || []}
      type="pie"
      height="227"
    />
  );
};

export default PieChart;
