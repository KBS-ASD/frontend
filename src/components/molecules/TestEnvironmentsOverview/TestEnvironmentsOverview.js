import React, { Component } from "react";
import getFormValues from "../../../util/getFormValues";
import getTests from "../../../actions/getTests";
import { GetTestFieldNames } from "../../../enum/FieldNames";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Label from "../../atoms/Label";
import Fieldset from "../../atoms/Fieldset";
import Input from "../../atoms/Input";
import TestEnvironments from "../TestEnvironments";
import style from "./TestEnvironmentsOverview.module.scss";

const EMPTY_ARRAY = [];

class TestEnvironmentsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      testEnvironments: []
    };
  }

  handleSubmit = async submitEvent => {
    submitEvent.preventDefault();

    this.setState({ isSubmitting: true });

    let testEnvironments = await getTests(
      getFormValues(submitEvent.currentTarget.elements)
    );

    testEnvironments.data = {
      configuraton: {
        name: "test",
        frequency: 0,
        size: 9,
        testDuration: 9,
        batchSize: 3,
        protocol: "Test"
      },
      status: 1,
      startTime: new Date()
    };

    this.setState({
      testEnvironments: testEnvironments.data || EMPTY_ARRAY,
      isSubmitting: false
    });
  };

  render() {
    const { isSubmitting, testEnvironments } = this.state;

    return (
      <div className={style.form}>
        <form onSubmit={this.handleSubmit}>
          <Fieldset>
            <Label htmlFor={GetTestFieldNames.Name}>Name</Label>
            <Input.Text name={GetTestFieldNames.Name} />
          </Fieldset>

          <Button type="submit" disabled={isSubmitting}>
            Search {isSubmitting && <Icon.Fire />}
          </Button>
        </form>

        <TestEnvironments data={testEnvironments} />
      </div>
    );
  }
}

export default TestEnvironmentsOverview;
