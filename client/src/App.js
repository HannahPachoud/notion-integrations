import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [state, setState] = useState({ apiResponse: "", notionResponse: [] });

  const callAPI = () =>
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setState({ apiResponse: res, notionResponse: state.notionResponse }));

  const callNotionAPI = () => 
    fetch("http://localhost:9000/notionDB")
      .then((res) => res.text())
      .then((res) => setState({apiResponse: state.apiResponse, notionResponse: JSON.parse(res) }));

  useEffect(() => {
    callNotionAPI().then(callAPI);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{state.apiResponse}</p>
        <p className="App-intro">{JSON.stringify(state.notionResponse)}</p>
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
