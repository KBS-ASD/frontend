import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../../../util/withClassName";
import TestEnvironmentStates from "../../../../../enum/TestEnvironmentStates";
import TestEnvironmentProtocols from "../../../../../enum/TestEnvironmentProtocols";

const style = {};

const TestEnvironment = ({
  configuration: { name, frequency, size, endingAtUTC, batchSize, protocol },
  status,
  createdAtUTC,
  className
}) => (
  <tr className={className}>
    <td>{name}</td>
    <td>{frequency}</td>
    <td>{size}</td>
    <td>{endingAtUTC}</td>
    <td>{batchSize}</td>
    <td>{protocol}</td>
    <td>{status}</td>
    <td>{createdAtUTC}</td>
  </tr>
);

TestEnvironment.PropTypes = {
  configuration: PropTypes.shape({
    name: PropTypes.string.isRequired,
    frequency: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    endingAtUTC: PropTypes.string.isRequired,
    batchSize: PropTypes.number.isRequired,
    protocol: PropTypes.oneOf(Object.values(TestEnvironmentProtocols))
  }).isRequired,
  status: PropTypes.oneOf(Object.values(TestEnvironmentStates)),
  createdAtUTC: PropTypes.string.isRequired
};

export default withClassName(style.root)(TestEnvironment);
