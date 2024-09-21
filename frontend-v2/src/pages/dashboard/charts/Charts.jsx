import React, { useState, useEffect } from "react";
import "./chart.css";
import Dev from "../../../assets/img/delivery-van 1.png";
import home from "../../../assets/img/home (1) 1.png";
import curty from "../../../assets/img/cutlery 1.png";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  // Monthly Spend and Cashback Data
  const spendData = [
    { month: "January", amount: 2000, cashback: 400 },
    { month: "February", amount: 1500, cashback: 300 },
    { month: "March", amount: 6000, cashback: 800 },
    { month: "April", amount: 4500, cashback: 600 },
    { month: "May", amount: 3000, cashback: 500 },
    { month: "June", amount: 5200, cashback: 400 },
  ];

  // Extract months, amounts, and cashbacks for the charts
  const months = spendData.map((item) => item.month);
  const amounts = spendData.map((item) => item.amount);
  const cashbacks = spendData.map((item) => item.cashback);

  // Define colors for each month
  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)", // January - light red
    "rgba(54, 162, 235, 0.2)", // February - light blue
    "rgba(255, 206, 86, 0.2)", // March - light yellow
    "rgba(75, 192, 192, 0.2)", // April - light green
    "rgba(153, 102, 255, 0.2)", // May - light purple
    "rgba(255, 159, 64, 0.2)", // June - light orange
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)", // January - red
    "rgba(54, 162, 235, 1)", // February - blue
    "rgba(255, 206, 86, 1)", // March - yellow
    "rgba(75, 192, 192, 1)", // April - green
    "rgba(153, 102, 255, 1)", // May - purple
    "rgba(255, 159, 64, 1)", // June - orange
  ];

  // State for total amount spent and cashback
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalCashback, setTotalCashback] = useState(0);

  useEffect(() => {
    // Calculate total amount spent and total cashback
    const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);
    const totalCashbackAmount = cashbacks.reduce(
      (acc, cashback) => acc + cashback,
      0
    );
    setTotalSpend(totalAmount);
    setTotalCashback(totalCashbackAmount);
  }, [amounts, cashbacks]);

  // Bar chart data and options
  const barData = {
    labels: months,
    datasets: [
      {
        label: "Amount per Month",
        data: amounts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie chart data and options
  const pieData = {
    labels: months,
    datasets: [
      {
        label: "Cashback per Month",
        data: cashbacks,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.raw;
            return label;
          },
        },
      },
    },
  };

  return (
    <section>
      <section className="Main-chart-span">
        <div className="full-bar-chat">
          <div className="Span-spend">
            <span>
              <h2>Monthly Spend</h2>
              <span>
                <img className="wio" src={curty} alt="Cutlery" />
                <img className="wio" src={home} alt="Home" />
                <img className="wio" src={Dev} alt="Delivery Van" />
              </span>
            </span>
            <span className="tot-cont">
              <h2 style={{ textAlign: "center" }}>{totalSpend}</h2>
              <p>Total Spend</p>
            </span>
          </div>
          <p className="ptag"></p>
          <div className="bar">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="pie-chart-container">
          <div className="pie-chart">
            <h2 style={{ marginLeft: "10px" }}>Cashback Distribution</h2>
            <Pie data={pieData} options={pieOptions} />
            <br />
            <h2 style={{ marginLeft: "10px" }}>
              Total Cashback: {totalCashback}
            </h2>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Charts;
