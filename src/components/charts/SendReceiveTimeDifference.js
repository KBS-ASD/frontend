import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

class SendReceiveTimeDifference extends Component {
  render() {
    const { events } = this.props;

    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;

    const [sendEvents, receiveEvents] = (events || []).reduce(
      (accumulator, currentValue) => {
        const [sendEvents, receiveEvents] = accumulator;

        //
        const messageId = parseInt(currentValue.properties.MessageId, 10);

        switch (currentValue.eventName) {
          case "MessageSent":
            const sendTime =
              parseInt(currentValue.properties.SendAt, 10) / 1000000;

            sendEvents[messageId] = {
              x: messageId,
              y: sendTime
            };

            minValue = Math.min(minValue, sendTime);
            maxValue = Math.max(maxValue, sendTime);
            break;

          case "MessageReceived":
            const receiveTime =
              parseInt(currentValue.properties.ReceivedAt, 10) / 1000000;

            receiveEvents[messageId] = {
              x: messageId,
              y: receiveTime
            };

            minValue = Math.min(minValue, receiveTime);
            maxValue = Math.max(maxValue, receiveTime);
            break;

          default:
            console.warn("Invalid event while processing data");
        }

        return accumulator;
      },
      [[], []]
    );

    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Send",
                data: sendEvents,
                pointBackgroundColor: "red"
              },
              {
                label: "Receive",
                data: receiveEvents,
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
                    max: sendEvents.length
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

export default SendReceiveTimeDifference;
