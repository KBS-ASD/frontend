import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

class App extends Component {
  body = {
    frequency: 0,
    size: 0,
    testDuration: 0,
    batchSize: 0,
    protocol: "string"
  };

  constructor(props) {
    super(props);
    this.state = props.intitialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            Frequency:
            <br />
            <input type="text" name="frequency" onChange={this.handleChange} />
            <br />
            Size:
            <br />
            <input type="text" name="size" onChange={this.handleChange} />
            <br />
            TestDuration:
            <br />
            <input
              type="text"
              name="TestDuration"
              onChange={this.handleChange}
            />
            <br />
            BatchSize:
            <br />
            <input type="text" name="batchSize" onChange={this.handleChange} />
            <br />
            Protocol:
            <br />
            <input type="text" name="protocol" onChange={this.handleChange} />
            <br />
            <input type="submit" value="Submit" onChange={this.handleChange} />
          </form>
        </header>
      </div>
    );
  }

  async handleSubmit(event) {
    await fetch("http://localhost:5000/api/Test", { method: "GET" }).then(res =>
      console.log(res)
    );

    // const response = await fetch('http://localhost:5000/api/Test', {
    //   method: 'POST',
    //   body: this.state,
    // });

    // const myJson = await response.json(); //extract JSON from the http response
    // console.log(myJson);
    // debugger;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
}

export default App;
