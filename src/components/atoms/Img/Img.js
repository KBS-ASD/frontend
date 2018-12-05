import React from "react";
import PropTypes from "prop-types";
import withClassName from "../../../util/withClassName";
import style from "./Img.module.scss";

// eslint-disable-next-line jsx-a11y/alt-text
const Img = props => <img {...props} />;

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default withClassName(style.root)(Img);
