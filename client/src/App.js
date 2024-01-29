import React, {useEffect, useState} from "react";
import {Bar, BarChart, Legend, Pie, PieChart, Tooltip, XAxis, YAxis,} from "recharts";
import "./App.css";

export default function App() {
    const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

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
            acc.set(item.category, prevValue + item.amount)
            return acc;
        }, new Map());

    const data = [...categorise(expenses)]
        .map(
            ([category, amount]) => (
                {
                    category: categories.find(x => x.id === category)?.name,
                    amount,
                    fill: barColors[Math.floor(amount) % barColors.length]
                }
            )
        );

    const CustomTooltip = ({active, payload, label}) => {
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
        <div className="App" style={{height: 400}}>
            <header className="App-header">
                <BarChart width={730} height={250} data={data}>
                    <XAxis dataKey="category" interval={0}/>
                    <YAxis/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
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
                    <Tooltip/>
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
