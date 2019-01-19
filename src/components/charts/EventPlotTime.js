import idx from "idx";
import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

class EventPlotTime extends Component {
  render() {
    const { a = {}, b = {} } = this.props;

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    const data = Object.keys(a).reduce((accumulator, guid) => {
      const messageId = idx(a[guid], _ => _.Message.Id);

      const aCreatedAt = (idx(a[guid], _ => _.CreatedAt) || 0) / 10000;
      const bCreatedAt = (idx(b[guid], _ => _.CreatedAt) || 0) / 10000;

      accumulator[messageId] = {
        x: aCreatedAt,
        y: bCreatedAt
      };

      minX = Math.min(minX, aCreatedAt);
      maxX = Math.max(maxX, aCreatedAt);
      minY = Math.min(minY, bCreatedAt);
      maxY = Math.max(maxY, bCreatedAt);

      return accumulator;
    }, []);

    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Message",
                data: data,
                pointBackgroundColor: "green"
              },
              {
                label: "Time line",
                data: [{ x: minX, y: minX }, { x: maxY, y: maxY }],
                pointBackgroundColor: "blue",
                showLine: true,
                lineTension: 0
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
                    labelString: "Time (ms)"
                  },
                  ticks: {
                    min: minX,
                    max: maxX
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Time (ms)"
                  },
                  ticks: {
                    min: minY,
                    max: maxY
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

export default EventPlotTime;
