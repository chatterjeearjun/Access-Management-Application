import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexRadial = (dData) => {
  const finalpercent = Math.round(
    (dData?.data?.approvedEmployeePercentage +
      dData?.data?.auditCompletedPercentage +
      dData?.data?.ticketClosurePercentage) /
      3
  );
  console.log(dData?.data, "ApexRadial");
  const radialchartColors = ["#d63031", "#e17055", "#34c38f"];
  const series = [finalpercent];
  const options = {
    chart: {
      height: 270,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 10,
            fontSize: "18px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    colors:
      finalpercent <= 70
        ? [radialchartColors[0]]
        : finalpercent > 70 && finalpercent <= 90
        ? [radialchartColors[1]]
        : [radialchartColors[2]],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors:
          finalpercent <= 70
            ? [radialchartColors[1]]
            : finalpercent > 70 && finalpercent <= 90
            ? [radialchartColors[2]]
            : [radialchartColors[2]],
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [20, 60],
      },
    },
    stroke: {
      dashArray: 4,
    },
    legend: {
      show: false,
    },
    labels: ["Series A"],
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="263"
      className="apex-charts"
    />
  );
};

export default ApexRadial;
