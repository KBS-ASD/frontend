import React, { createElement } from "react";
import withClassName from "../../../../util/withClassName";
import style from "./DefaultButton.module.scss";

const DefaultButton = ({ children, ...props }) =>
  createElement(
    "button",
    props,
    <span className={style.flexWrapper}>{children}</span>
  );

export default withClassName(style.root)(DefaultButton);
