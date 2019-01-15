import idx from "idx";
import React from "react";
import { TestCaseTypeName } from "../../constants/enum/TestCaseType";
import { TransportTypeName } from "../../constants/enum/TransportType";
import "./ResultsView.scss";

// Charts
import EventTypeDoughnut from "../charts/EventTypeDoughnut";
import EventCompareTime from "../charts/EventCompareTime";
import EventPlotTime from "../charts/EventPlotTime";

//
const optionTypeMap = {
  testCaseType: TestCaseTypeName,
  transportType: TransportTypeName
};

const Configuration = props => (
  <table>
    <tbody>
      {Object.keys(props).map(option => (
        <tr key={option}>
          <td>{option}</td>
          <td>
            {idx(optionTypeMap, _ => _[option][props[option]]) || props[option]}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ResultsView = ({ configuration, events }) => (
  <div className="ResultsView">
    <div className="ResultsView__top">
      <div className="ResultsView__top__benchmarkConfiguration">
        <h2>Configuration</h2>

        <Configuration {...configuration} />
      </div>

      <div className="ResultsView__top__eventTypeOverview">
        <h2>Event type distribution</h2>

        <EventTypeDoughnut
          segments={Object.keys(events).map(label => ({
            label,
            value: Object.keys(events[label]).length
          }))}
        />
      </div>
    </div>

    <h2>PostPublish/PreReceive Time</h2>
    <p>*Uitleg</p>
    <EventCompareTime a={events.PostPublish} b={events.PreReceive} />

    <h2>PrePublish/PostReceive Time</h2>
    <p>*Uitleg</p>
    <EventCompareTime a={events.PrePublish} b={events.PostReceive} />

    <h2>Send Opposite Received</h2>
    <p>*Uitleg</p>
    <EventPlotTime a={events.PostPublish} b={events.PreReceive} />
  </div>
);

export default ResultsView;
