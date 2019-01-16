import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./SourceSelector.scss";

class SourceSelector extends Component {
  static propTypes = {
    component: PropTypes.node.isRequired,
    data: PropTypes.objectOf(PropTypes.array).isRequired
  };

  state = {};

  formRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    if (state.aType || state.bType) return;

    const { data } = props;

    const [aType, bType] = Object.keys(data).filter(
      type => Object.keys(data[type]).length
    );

    return {
      aType,
      bType
    };
  }

  handleSubmit = () => {
    const [firstSelect, secondSelect] = this.formRef.current.elements;

    this.setState({ aType: firstSelect.value, bType: secondSelect.value });
  };

  render() {
    const { component, data } = this.props;
    const { aType, bType } = this.state;

    const eventTypes = Object.keys(data).filter(
      eventType => Object.keys(data[eventType]).length
    );

    return (
      <Fragment>
        <form
          ref={this.formRef}
          onSubmit={this.handleSubmit}
          className="SourceSelector__form"
        >
          <span>Compare&nbsp;</span>

          <select name="first" value={aType} onChange={this.handleSubmit}>
            {eventTypes
              .filter(eventType => eventType !== bType)
              .map(eventType => (
                <option value={eventType} key={eventType}>
                  {eventType}
                </option>
              ))}
          </select>

          <span>&nbsp;with&nbsp;</span>

          <select name="second" value={bType} onChange={this.handleSubmit}>
            {eventTypes
              .filter(eventType => eventType !== aType)
              .map(eventType => (
                <option value={eventType} key={eventType}>
                  {eventType}
                </option>
              ))}
          </select>
        </form>

        {React.cloneElement(component, { a: data[aType], b: data[bType] })}
      </Fragment>
    );
  }
}

SourceSelector.propTypes = {};

export default SourceSelector;
