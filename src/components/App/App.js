import React, { Component } from "react";
import idx from "idx";
import getBenchmark from "../../actions/getBenchmark";
import Layout from "../Layout";
import FilesView from "../FilesView";
import ResultsView from "../ResultsView";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      benchmark: null
    };
  }

  showBenchmark = async fileName => {
    const benchmark = await getBenchmark(fileName);
    this.setState({ benchmark });
  };

  render() {
    const { benchmark } = this.state;

    return (
      <div className="App">
        <Layout
          sidebar={
            <FilesView
              showBenchmark={this.showBenchmark}
              activeBenchmark={idx(benchmark, _ => _.configuration.name)}
            />
          }
          content={
            <ResultsView
              configuration={idx(benchmark, _ => _.configuration)}
              events={idx(benchmark, _ => _.events)}
            />
          }
        />
      </div>
    );
  }
}

export default App;
