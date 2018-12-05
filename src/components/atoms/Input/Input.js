import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import style from "./Input.module.scss";

const inputType = ["text", "checkbox", "radio", "number", "date"];

const Input = type => props => <input type={type} {...props} />;

const propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string
};

inputType.forEach(type => {
  const inputName = type.charAt(0).toUpperCase() + type.slice(1);

  Input[inputName] = withClassName(style.Input)(Input(type));
  Input[inputName].propTypes = propTypes;
});

export default Input;
