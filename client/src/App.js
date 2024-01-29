import React, { useEffect, useState } from "react";
import "./App.css";
import {ResponsiveBar} from "@nivo/bar";

export default function App() {
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);

  const callNotionAPI = () =>
    fetch(`http://localhost:9000/notionDB${window.location.search}`)
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
      acc.set(item.category, prevValue + item.amount);
      return acc;
    }, new Map());

  const data = [...categorise(expenses)].map(([category, amount]) => ({
    category: categories.find((x) => x.id === category)?.name,
    amount
  }));

  const barColor = "#bd7a0f";
  console.log(data)
    const amounts = data.filter(([category, amount]) => ({amount}));
    // const max = Math.max(amounts)
    console.log(amounts);

  return (
    <div className="App" style={{ height: 300 }}>
      <ResponsiveBar
          width={800}
          height={300}
          data={data}
          keys={["amount"]}
          maxValue={2500}
          padding={0.6}
          margin={{
            top: 50,
            right: 10,
            bottom: 36,
            left: 36
          }}
          indexBy="category"
          enableLabel={false}
          colors={{scheme: 'purpleRed_green'}}
          colorBy={"index"}
          borderRadius={2}
          axisLeft={{
            tickValues: 7
          }}
      />
    </div>
  );
}
