import React from "react";
import PropTypes from "prop-types";
import TestEnvironment from "./components/TestEnvironment";
import withClassName from "../../../util/withClassName";
import style from "./TestEnvironments.module.scss";

const TestEnvironments = ({ data, className }) => (
  <table className={className}>
    <thead>
      <tr>
        <td>Name</td>
        <td>Frequency</td>
        <td>Size</td>
        <td>BatchSize</td>
        <td>Protocol</td>
        <td>Status</td>
        <td>EndTimeUTC</td>
        <td>CreatedAtUTC</td>
      </tr>
    </thead>

    <tbody>
      {data.map(row => (
        <TestEnvironment {...row} />
      ))}

      {!data.length && (
        <tr>
          <td colSpan={8} style={{ color: "grey" }}>
            No results
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

TestEnvironments.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default withClassName(style.TestEnvironments)(TestEnvironments);
