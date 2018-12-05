import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import InputTypes from "../../../enum/InputTypes";
import style from "./Input.module.scss";

const Input = type => ({ options, ...props }) => {
  if (type === InputTypes.Select) {
    return (
      <select {...props}>
        {options.map(([name, value]) => (
          <option value={value} key={name}>
            {name}
          </option>
        ))}
      </select>
    );
  }

  return <input type={type} {...props} />;
};

const propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string
};

Object.keys(InputTypes).forEach(type => {
  Input[type] = withClassName(style.Input)(Input(InputTypes[type]));
  Input[type].propTypes = propTypes;

  if (InputTypes[type] === InputTypes.Select) {
    Input[type].defaultProps = {
      options: []
    };
  }
});

export default Input;
