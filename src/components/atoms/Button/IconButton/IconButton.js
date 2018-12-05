import React from "react";
import withClassName from "../../../../util/withClassName";
import Button from "../";
import style from "./IconButton.module.scss";

const IconButton = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
);

export default withClassName(style.root)(IconButton);
