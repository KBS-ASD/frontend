import React from "react";
import PropTypes from "prop-types";
import TestEnvironment from "./components/TestEnvironment";
import withClassName from "../../../util/withClassName";

const style = {};

const TestEnvironments = ({ data, className }) => (
  <table className={className}>
    <tr>
      <td>Name</td>
      <td>Frequency</td>
      <td>Size</td>
      <td>endTimeUTC</td>
      <td>Name</td>
      <td>Name</td>
      <td>Name</td>
    </tr>

    {data.map(row => (
      <TestEnvironment {...row} />
    ))}
  </table>
);

TestEnvironments.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default withClassName(style.root)(TestEnvironments);
