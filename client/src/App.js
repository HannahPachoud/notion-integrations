import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import "./App.css";
import Graph from "./components/Graph";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const callNotionAPI = () =>
    fetch("http://localhost:9000/notionDB")
      .then((res) => res.text())
      .then((res) => setExpenses(JSON.parse(res)));

  useEffect(() => {
    callNotionAPI();
  }, []);

  const categorise = (expenses) =>
    expenses.reduce((acc, item) => {
      const prevValue = acc.get(item.category) || 0;
      acc.set(item.category, prevValue + item.amount)
      return acc;
    }, new Map());

  const data = [...categorise(expenses)]
    .map(([category, amount]) => ({category, amount}));
  console.log(data)

  return (
    <div className="App" style={{ height: 400 }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p className="App-intro">{expenses)}</p> */}
        {/* <Graph categories={categorise(expenses)}></Graph> */}
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
          <PieChart width={730} height={250}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
