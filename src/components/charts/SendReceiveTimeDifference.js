import React, { Component } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";

class SendReceiveTimeDifference extends Component {
  render() {
    const { events } = this.props;

    const [sendEvents, receiveEvents] = (events || []).reduce(
      (accumulator, currentValue) => {
        const [sendEvents, receiveEvents] = accumulator;

        //
        const messageId = parseInt(currentValue.properties.MessageId, 10);

        switch (currentValue.eventName) {
          case "MessageSent":
            sendEvents[messageId] = {
              x: messageId,
              y: parseInt(currentValue.properties.SendAt, 10) / 1000
            };
            break;

          case "MessageReceived":
            receiveEvents[messageId] = {
              x: messageId,
              y: parseInt(currentValue.properties.ReceivedAt, 10) / 1000
            };
            break;

          default:
            console.warn("Invalid event while processing data");
        }

        return accumulator;
      },
      [[], []]
    );

    const minValue = Math.min(...sendEvents, ...receiveEvents);
    const maxValue = Math.max(...sendEvents, ...receiveEvents);

    return (
      <div>
        <ScatterChart
          data={{
            datasets: [
              {
                label: "Send",
                data: [{ x: 0, y: 0 }, { x: events.length, y: maxValue }],
                showLine: true
              },
              {
                label: "Send",
                data: sendEvents,
                showLine: true
              },
              {
                label: "Receive",
                data: receiveEvents,
                showLine: true
              }
            ]
          }}
          options={{
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Message id"
                  },
                  ticks: {
                    min: 0,
                    max: events.length
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
