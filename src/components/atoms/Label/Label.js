import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import style from "./Label.module.scss";

const Label = ({ children, ...props }) => <label {...props}>{children}</label>;

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withClassName(style.Label)(Label);
