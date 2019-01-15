import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

const hslGenerator = function*() {
  const saturation = 80;
  const lightness = 70;

  let hue = 0;

  while (true) {
    yield {
      firstColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      secondColor: `hsl(${hue}, ${saturation}%, ${lightness + 10}%)`
    };

    // Change hue
    hue = hue + (30 % 360);
  }
};

class EventTypeDoughnut extends Component {
  render() {
    const { segments } = this.props;

    const data = [];
    const labels = [];
    const backgroundColor = [];
    const hoverBackgroundColor = [];

    const hslIterator = hslGenerator();

    segments.forEach(currentValue => {
      const { firstColor, secondColor } = hslIterator.next().value;

      data.push(currentValue.value);
      labels.push(currentValue.label);
      backgroundColor.push(firstColor);
      hoverBackgroundColor.push(secondColor);
    });

    return (
      <Doughnut
        data={{
          datasets: [{ data, backgroundColor, hoverBackgroundColor }],
          labels: labels
        }}
        legend={{
          position: "left"
        }}
      />
    );
  }
}

export default EventTypeDoughnut;
