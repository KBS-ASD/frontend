import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import style from "./Fieldset.module.scss";

const Fieldset = ({ children, ...props }) => (
  <fieldset {...props}>{children}</fieldset>
);

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

export default withClassName(style.Fieldset)(Fieldset);
