import React from "react";
import SendOppositeReceived from "../charts/SendOppositeReceived";
import SendReceiveTimeDifference from "../charts/SendReceiveTimeDifference";
import "./ResultsView.scss";

const Configuration = props => (
  <table>
    <tbody>
      {Object.keys(props).map(option => (
        <tr key={option}>
          <td>{option}</td>
          <td>{props[option]}</td>
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
