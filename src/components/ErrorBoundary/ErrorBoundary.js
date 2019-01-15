import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    fallbackText: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error);
    console.info(info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>{this.props.fallbackText}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
