import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs";
import results from "./results.json";
import "./App.scss";

class MyChart extends Component {
  constructor() {
    super();

    this.chartData = results
      .reduce((accumulator, currentValue) => {
        if (accumulator[currentValue.properties.MessageId] == null)
          accumulator[currentValue.properties.MessageId] = {};

        switch (currentValue.eventName) {
          case "MessageReceived":
            accumulator[currentValue.properties.MessageId].y = parseInt(
              currentValue.properties.ReceivedAt,
              10
            );
            break;

          case "MessageSent":
            accumulator[currentValue.properties.MessageId].x = parseInt(
              currentValue.properties.SentAt,
              10
            );
            break;

          default:
            console.info("Event name out or reach");
        }

        return accumulator;
      }, [])
      // Convert to timespan in milliseconds
      .map(point => (point.y - point.x) / 10000);

    // My chart options
    this.chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <LineChart
          data={{
            labels: [...Array(this.chartData.length / 5).keys()],
            datasets: [
              {
                data: this.chartData
              }
            ]
          }}
          options={this.chartOptions}
          width="1280"
          height="720"
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyChart />
      </div>
    );
  }
}

export default App;
