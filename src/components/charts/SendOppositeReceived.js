import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

const options = {
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

class SendOppositeReceived extends Component {
  render() {
    const { events } = this.props;

    const data = (events || []).reduce((accumulator, currentValue) => {
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

    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Test data",
                data
              },
              {
                data: [{ x: 0, y: 0 }, { x: 100000, y: 100000 }],
                showLine: true
              }
            ]
          }}
          options={options}
          width={1280}
          height={720}
        />
      </div>
    );
  }
}

export default SendOppositeReceived;
