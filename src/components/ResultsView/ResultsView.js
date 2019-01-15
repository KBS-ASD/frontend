import idx from "idx";
import React from "react";
import { TestCaseTypeName } from "../../constants/enum/TestCaseType";
import { TransportTypeName } from "../../constants/enum/TransportType";
import "./ResultsView.scss";

// Charts
import SendReceiveTimeDifference from "../charts/SendReceiveTimeDifference";

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

    {/*<h2>Send/receive time difference</h2>*/}
    {/*<SendOppositeReceived events={events} />*/}

    <h2>Send/receive time difference</h2>
    <SendReceiveTimeDifference events={events} />
  </div>
);

export default ResultsView;
