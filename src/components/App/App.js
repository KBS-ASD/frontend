import React, { Component, Fragment } from "react";
import idx from "idx";
import { stringify as stringifyQueryString } from "querystring";
import getBenchmark from "../../actions/getBenchmark";
import BenchmarkForm from "../BenchmarkForm";
import FilesView from "../FilesView";
import Layout from "../Layout";
import ResultsView from "../ResultsView";
import ServiceStatus from "../ServiceStatus";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      configuration: null
    };
  }

  events = {};

  showBenchmark = async fileName => {
    window.history.pushState(
      null,
      fileName,
      `/?${stringifyQueryString({ fileName })}`
    );

    const { configuration, events } = await getBenchmark(fileName);

    this.events = events;

    this.setState({ configuration: configuration, activeBenchmark: fileName });
  };

  render() {
    const { configuration, activeBenchmark } = this.state;

    return (
      <div className="App">
        <Layout
          sidebar={
            <Fragment>
              <ServiceStatus />

              <FilesView
                showBenchmark={this.showBenchmark}
                activeBenchmark={activeBenchmark}
              />

              <BenchmarkForm />
            </Fragment>
          }
          content={
            <ResultsView configuration={configuration} events={this.events} />
          }
        />
      </div>
    );
  }
}

export default App;
