import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const callNotionAPI = () => 
    fetch("http://localhost:9000/notionDB")
      .then((res) => res.text())
      .then((res) => setExpenses(JSON.parse(res)));

  useEffect(() => {
    callNotionAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{JSON.stringify(expenses)}</p>
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
