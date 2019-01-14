import React from "react";
import SendOppositeReceived from "../charts/SendOppositeReceived";

const Configuration = props => (
  <div>
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
  </div>
);

const ResultsView = ({ configuration, events }) => (
  <div>
    <Configuration {...configuration} />

    <SendOppositeReceived events={events} />
  </div>
);

export default ResultsView;
