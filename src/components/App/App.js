import React, { Component, Fragment } from "react";
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

  datasets = {};

  showBenchmark = async fileName => {
    this.setState({ activeBenchmark: fileName });

    window.history.pushState(
      null,
      fileName,
      `/?${stringifyQueryString({ fileName })}`
    );

    // No need to download a new dataset if it already exists
    if (this.datasets[fileName]) return;

    this.setState({ isLoading: true });

    this.datasets[fileName] = await getBenchmark(fileName);

    this.setState({ isLoading: false });
  };

  render() {
    const { activeBenchmark } = this.state;

    const { configuration, events } = this.datasets[activeBenchmark] || {};

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
            !activeBenchmark ? (
              <p>Loading data...</p>
            ) : (
              <ResultsView configuration={configuration} events={events} />
            )
          }
        />
      </div>
    );
  }
}

export default App;
