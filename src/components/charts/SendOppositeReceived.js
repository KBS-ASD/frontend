import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

class SendOppositeReceived extends Component {
  render() {
    const { events } = this.props;

    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    const data = (events || []).reduce((accumulator, currentValue) => {
      if (accumulator[currentValue.properties.MessageId] == null)
        accumulator[currentValue.properties.MessageId] = { x: 0, y: 0 };

      switch (currentValue.eventName) {
        case "MessageReceived":
          const received =
            parseInt(currentValue.properties.ReceivedAt) / 1000000;
          accumulator[currentValue.properties.MessageId].y = received;
          minY = Math.min(minY, received);
          maxY = Math.max(maxY, received);
          break;

        case "MessageSent":
          const send = parseInt(currentValue.properties.SendAt) / 1000000;
          accumulator[currentValue.properties.MessageId].x = send;
          minX = Math.min(minX, send);
          maxX = Math.max(maxX, send);
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
                label: "Message",
                data: data,
                pointBackgroundColor: "green"
              }
              // {
              //   label: "Time line",
              //   data: [{x: minX, y: minX}, {x: maxY, y: maxY}],
              //   pointBackgroundColor: "blue",
              //   showLine: true
              // }
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
                    labelString: "Time send (ms)"
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
                    labelString: "Time received (ms)"
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

export default SendOppositeReceived;
