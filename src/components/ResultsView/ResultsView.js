import idx from "idx";
import React from "react";
import { TestCaseTypeName } from "../../constants/enum/TestCaseType";
import { TransportTypeName } from "../../constants/enum/TransportType";
import "./ResultsView.scss";

// Charts
import SendReceiveTime from "../charts/SendReceiveTime";
import SendOppositeReceived from "../charts/SendOppositeReceived";

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

    <h2>Send/receive Time</h2>
    <p>*Uitleg</p>
    <SendReceiveTime events={events} />

    <h2>Send Opposite Received</h2>
    <p>*Uitleg</p>
    <SendOppositeReceived events={events} />
  </div>
);

export default ResultsView;
