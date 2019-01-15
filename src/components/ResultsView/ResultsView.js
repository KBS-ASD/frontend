import idx from "idx";
import React from "react";
import { TestCaseTypeName } from "../../constants/enum/TestCaseType";
import { TransportTypeName } from "../../constants/enum/TransportType";
import "./ResultsView.scss";

// Charts
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
    <h2>Configuration</h2>
    <Configuration {...configuration} />

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
