import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";
import "./Chart.css";

export default function Chart({ data: { confirmed, recovered, deaths }, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const getDailyData = async () => {
      const apiData = await fetchDailyData();
      setDailyData(apiData);
    };

    getDailyData();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed.total),
            label: "Active",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths.total),
            label: "Fatalities",
            borderColor: "red",
            backgroundColor: "rgb(204,51,0)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Active', 'Recovered', 'Fatalities'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['rgb(255,153,102)', 'rgb(51,153,0)', 'rgb(204,51,0)'],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `${country}` }
      }}
    />
  ) : null;

  return <div className="chart-container">{!country ? lineChart : barChart}</div>;
}
