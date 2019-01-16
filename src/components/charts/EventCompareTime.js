import React, { Component } from "react";
import idx from "idx";
import { Scatter as ScatterChart } from "react-chartjs-2";

class EventCompareTime extends Component {
  render() {
    const { a = {}, b = {} } = this.props;

    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;

    const { a: processedA, b: processedB } = Object.keys(a).reduce(
      (accumulator, guid) => {
        const messageId = idx(a[guid], _ => _.Message.Id);

        const aCreatedAt = idx(a[guid], _ => _.CreatedAt) / 10000;
        const bCreatedAt = idx(b[guid], _ => _.CreatedAt) / 10000;

        accumulator.a[messageId] = {
          x: messageId,
          y: aCreatedAt
        };

        accumulator.b[messageId] = {
          x: messageId,
          y: bCreatedAt
        };

        minValue = Math.min(minValue, aCreatedAt, bCreatedAt);
        maxValue = Math.max(maxValue, aCreatedAt, bCreatedAt);

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
