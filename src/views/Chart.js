import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function LineChart({ seriesData }) {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Count 10",
        "Count 20",
        "Count 50",
        "Count 100",
        "Count 500",
        "Count 1000",
        "Count 5000",
      ],
    },
  });

  //   const [series, setSeries] = useState([
  //     {
  //       data: [],
  //     },
  //   ]);
  //   useEffect(() => {
  //     setSeries(...series, { data: seriesData });
  //   }, []);
  //   console.log(series);
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={seriesData} type="bar" width="700" />
        </div>
      </div>
    </div>
  );
}
