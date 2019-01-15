import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

class EventCompareTime extends Component {
  render() {
    const { a = {}, b = {} } = this.props;

    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;

    const { a: processedA, b: processedB } = Object.keys(a).reduce(
      (accumulator, guid) => {
        const aEvent = a[guid];
        const bEvent = b[guid];

        const messageId = a[guid].Message.Id;

        accumulator.a[messageId] = {
          x: messageId,
          y: aEvent.CreatedAt
        };

        accumulator.b[messageId] = {
          x: messageId,
          y: bEvent.CreatedAt
        };

        minValue = Math.min(minValue, aEvent.CreatedAt, bEvent.CreatedAt);
        maxValue = Math.max(maxValue, aEvent.CreatedAt, bEvent.CreatedAt);

        return accumulator;
      },
      { a: [], b: [] }
    );

    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Send",
                data: processedA,
                pointBackgroundColor: "red"
              },
              {
                label: "Receive",
                data: processedB,
                pointBackgroundColor: "blue"
              }
            ]
          }}
          options={{
            animation: {
              duration: 0
            },
            hover: {
              animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Message id"
                  },
                  ticks: {
                    min: 0,
                    max: a.length
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Time (in ms)"
                  },
                  ticks: {
                    min: minValue,
                    max: maxValue
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default EventCompareTime;
