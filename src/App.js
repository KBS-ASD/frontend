import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";
import results from "./results.json";
import "./App.scss";

class SendOppositeReceived extends Component {
  constructor() {
    super();

    this.chartData = results.reduce((accumulator, currentValue) => {
      if (accumulator[currentValue.properties.MessageId] == null)
        accumulator[currentValue.properties.MessageId] = { x: 0, y: 0 };

      switch (currentValue.eventName) {
        case "MessageReceived":
          accumulator[currentValue.properties.MessageId].y =
            parseInt(currentValue.properties.ReceivedAt) / 1000;
          break;

        case "MessageSent":
          accumulator[currentValue.properties.MessageId].x =
            parseInt(currentValue.properties.SentAt) / 1000;
          break;

        default:
          accumulator[currentValue.properties.MessageId].y = -1;
      }

      return accumulator;
    }, []);

    this.chartOptions = {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "SentAt (ms)"
            },
            ticks: {
              // beginAtZero: true,
              min: 60000,
              max: 80000
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "ReceivedAt (ms)"
            },
            ticks: {
              // beginAtZero: true,
              min: 60000,
              max: 80000
            }
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Test data",
                data: this.chartData
              },
              {
                data: [{ x: 0, y: 0 }, { x: 100000, y: 100000 }],
                showLine: true
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
        <SendOppositeReceived />
      </div>
    );
  }
}

export default App;
