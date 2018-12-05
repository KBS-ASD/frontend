import { createElement } from "react";
import withClassName from "../../../util/withClassName";
import style from "./Icon.module.scss";

// Icons
import { ReactComponent as Search } from "./svg/search.svg";
import { ReactComponent as Fire } from "./svg/fire.svg";

const icons = {
  Search,
  Fire
};

const icon = icon => ({ ...props }) => createElement(icon, props);

export default Object.keys(icons).reduce(
  (accumulator, iconName) =>
    (accumulator[iconName] = withClassName(style.root)(
      icon(icons[iconName])
    )) && accumulator,
  {}
);
