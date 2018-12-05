import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default (rootClassName, modifiers) => WrappedComponent => {
  const withClassName = ({ className, ...restProps }) => (
    <WrappedComponent
      className={classNames(
        rootClassName,
        className,
        modifiers && modifiers(restProps)
      )}
      {...restProps}
    />
  );

  withClassName.propTypes = {
    className: PropTypes.string
  };

  return withClassName;
};
