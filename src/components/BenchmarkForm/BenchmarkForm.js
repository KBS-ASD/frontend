import React, { Component } from "react";
import postBenchmark from "../../actions/postBenchmark";
import TransportType from "../../constants/enum/TransportType";
import TestCaseType from "../../constants/enum/TestCaseType";
import "./BenchmarkForm.scss";

/*
{
  "name": "string",
  "messageCount": 0,
  "fillerSize": 0,
  "clientCount": 0,
  "timeout": "string",
  "testCaseType": 1,
  "transportType": 1,
  "azureServiceBusOperationTimeout": "string",
  "useExpress": true
}
*/

const TIMESPAN_REGEX = /\d{2}:\d{2}:\d{2}/;

const InputGroup = ({ children, inline, label, name }) => (
  <div className={`InputGroup ${inline && "-inline"}`}>
    <label htmlFor={name}>{label}</label>
    {children}
  </div>
);

const Input = ({ name, type, children, ...props }) =>
  type === "select" ? (
    <select {...props} name={name} id={name}>
      {children}
    </select>
  ) : (
    <input {...props} type={type} name={name} id={name} />
  );

class BenchmarkForm extends Component {
  state = {
    loading: false
  };

  handleSubmit = async submitEvent => {
    submitEvent.preventDefault();

    const formElement = submitEvent.target;
    const elements = Array.from(formElement.elements);

    const invalidElements = this.validateElements(elements);

    if (invalidElements.length) {
      this.setState({ error: `Invalid fields: ${invalidElements.join(", ")}` });
      return;
    }

    this.setState({ error: null });

    const configuration = elements.reduce((accumulator, currentValue) => {
      if (!currentValue.name || !currentValue.value) {
        return accumulator;
      }

      // Set boolean value if element is checkbox
      if (currentValue.type === "checkbox") {
        accumulator[currentValue.name] = currentValue.checked;

        // Convert strings to numbers if string only contains numbers
      } else if (/^\d+$/.test(currentValue.value)) {
        accumulator[currentValue.name] = Number(currentValue.value);

        // Else just set the string value
      } else {
        accumulator[currentValue.name] = currentValue.value;
      }

      return accumulator;
    }, {});

    this.setState({ loading: true });

    await postBenchmark(configuration);

    // Reset form after successful submit
    formElement.reset();

    this.setState({ loading: false });
  };

  validateElements = elements =>
    elements.reduce((accumulator, element) => {
      const validationRegex = element.dataset.validation;

      if (!element.value || !validationRegex) return accumulator;

      if (
        !new RegExp(validationRegex.slice(1, validationRegex.length - 1)).test(
          element.value
        )
      )
        accumulator.push(element.name);

      return accumulator;
    }, []);

  render() {
    const { loading, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="BenchmarkForm">
        <h2>Run benchmark</h2>

        <InputGroup label="MessageCount" name="messageCount">
          <Input type="number" name="messageCount" min="0" step="100" />
        </InputGroup>

        <InputGroup label="FillerSize" name="fillerSize">
          <Input type="number" name="fillerSize" min="0" />
        </InputGroup>

        <InputGroup label="ClientCount" name="clientCount">
          <Input type="number" name="clientCount" min="0" />
        </InputGroup>

        <InputGroup label="Timeout" name="timeout">
          <Input
            type="time"
            name="timeout"
            step="1"
            data-validation={TIMESPAN_REGEX}
          />
        </InputGroup>

        <InputGroup label="TestCaseType" name="testCaseType">
          <Input type="select" name="testCaseType">
            <option value={TestCaseType.REQUEST_RESPONSE}>
              Request\Response
            </option>
            <option value={TestCaseType.CONSUME_CONSUMER}>
              Consume\Consumer
            </option>
          </Input>
        </InputGroup>

        <InputGroup label="TransportType" name="transportType">
          <Input type="select" name="transportType">
            <option value={TransportType.IN_MEMORY}>In Memory</option>
            <option value={TransportType.RABBIT_MQ}>Rabbit MQ</option>
            <option value={TransportType.AZURE_SERVICE_BUS_CORE}>
              Azure Service Bus Core
            </option>
          </Input>
        </InputGroup>

        <InputGroup
          label="AzureServiceBusOperationTimeout"
          name="azureServiceBusOperationTimeout"
        >
          <Input
            type="time"
            name="azureServiceBusOperationTimeout"
            data-validation={TIMESPAN_REGEX}
            step="1"
          />
        </InputGroup>

        <InputGroup label="UseExpress" name="useExpress" inline>
          <Input type="checkbox" name="useExpress" value={1} />
        </InputGroup>

        {error && <div className="errors">{error}</div>}

        <button type="submit" disabled={loading}>
          Run benchmark
        </button>
      </form>
    );
  }
}

BenchmarkForm.propTypes = {};

export default BenchmarkForm;
