import idx from "idx";
import React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { TestCaseTypeName } from "../../constants/enum/TestCaseType";
import { TransportTypeName } from "../../constants/enum/TransportType";
import "./ResultsView.scss";

// Charts
import EventTypeDoughnut from "../charts/EventTypeDoughnut";
import EventCompareTime from "../charts/EventCompareTime";
import EventPlotTime from "../charts/EventPlotTime";

//
const optionTypeMap = {
  TestCaseType: TestCaseTypeName,
  TransportType: TransportTypeName
};

const objectLengthFallback = (a, b) => {
  if (a == null || Object.keys(a).length < 1) return b;

  return a;
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

const ResultsView = ({ configuration, events = {} }) => (
  <div className="ResultsView">
    <div className="ResultsView__top">
      <ErrorBoundary fallbackText="Something went wrong while rendering 'Configuration'">
        <div className="ResultsView__top__benchmarkConfiguration">
          <h2>Configuration</h2>

          <Configuration {...configuration} />
        </div>
      </ErrorBoundary>

      <ErrorBoundary fallbackText="Something went wrong while rendering 'Event type distribution'">
        <div className="ResultsView__top__eventTypeOverview">
          <h2>Event type distribution</h2>

          <EventTypeDoughnut
            segments={Object.keys(events).map(label => ({
              label,
              value: Object.keys(events[label]).length
            }))}
          />
        </div>
      </ErrorBoundary>
    </div>

    <ErrorBoundary fallbackText="Something went wrong while rendering 'PostPublish/PreReceive Time'">
      <h2>PostPublish/PreReceive Time</h2>
      <p>*Uitleg</p>
      <EventCompareTime
        a={objectLengthFallback(events.PostPublish, events.PostSend)}
        b={events.PreReceive}
      />
    </ErrorBoundary>

    <ErrorBoundary fallbackText="Something went wrong while rendering 'PrePublish/PostReceive Time'">
      <h2>PrePublish/PostReceive Time</h2>
      <p>*Uitleg</p>
      <EventCompareTime
        a={objectLengthFallback(events.PrePublish, events.PreSend)}
        b={events.PostReceive}
      />
    </ErrorBoundary>

    <ErrorBoundary fallbackText="Something went wrong while rendering 'Send Opposite Received'">
      <h2>Send Opposite Received</h2>
      <p>*Uitleg</p>
      <EventPlotTime
        a={objectLengthFallback(events.PostPublish, events.PostSend)}
        b={events.PreReceive}
      />
    </ErrorBoundary>
  </div>
);

export default ResultsView;
