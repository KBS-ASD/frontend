import { createElement } from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import style from "./Text.module.scss";

export const ElementType = {
  P: "p",
  SPAN: "span",
  DIV: "div"
};

const textComponent = className => {
  const Text = ({ element, children, ...props }) =>
    createElement(element, props, children);

  Text.defaultProps = {
    element: ElementType.DIV
  };

  Text.propTypes = {
    element: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  return withClassName(style.root, () => ({ [className]: !!className }))(Text);
};

export default {
  Primary: textComponent(style.primary),
  Loud: textComponent(style.loud)
};
