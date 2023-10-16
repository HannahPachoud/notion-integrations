import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {apiResponse: "",
  notionResponse: ""};
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  callNotionAPI(){
    fetch("http://localhost:9000/notionDB")
          .then(res => res.text())
          .then(res => this.setState({ notionResponse: res }));
  }

    
  componentWillMount(){
    this.callAPI();
    this.callNotionAPI();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">{this.state.apiResponse}</p>
          <p className="App-intro">{JSON.stringify(this.state.notionResponse, null, 2)}</p>
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

}

export default App;
