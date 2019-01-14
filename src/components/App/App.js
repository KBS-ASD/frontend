import React, { Component, Fragment } from "react";
import idx from "idx";
import getBenchmark from "../../actions/getBenchmark";
import FilesView from "../FilesView";
import Layout from "../Layout";
import ResultsView from "../ResultsView";
import ServiceStatus from "../ServiceStatus";
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
            <Fragment>
              <ServiceStatus />
              <FilesView
                showBenchmark={this.showBenchmark}
                activeBenchmark={idx(benchmark, _ => _.configuration.name)}
              />
            </Fragment>
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
