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
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import "./App.css";
import Graph from "./components/Graph";

export default function App() {
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const callNotionAPI = () =>
    fetch("http://localhost:9000/notionDB")
      .then((res) => res.text())
      .then((res) => setExpenses(JSON.parse(res)));

  const getNotionCategories = () =>
      fetch("http://localhost:9000/notionDB/categories")
          .then((res) => res.text())
          .then((res) => setCategories(JSON.parse(res)));


  useEffect(() => {
    callNotionAPI();
    getNotionCategories();
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`$${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div className="App" style={{ height: 400 }}>
      <header className="App-header">
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="amount" fill="#00a0fc">
          </Bar>
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
