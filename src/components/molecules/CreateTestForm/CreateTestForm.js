import React, { Component } from "react";
import FieldNames from "../../../enum/FieldNames";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Label from "../../atoms/Label";
import Fieldset from "../../atoms/Fieldset";
import Input from "../../atoms/Input";
import style from "./CreateTestForm.module.scss";

class CreateTestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false
    };
  }

  handleSubmit = submitEvent => {
    submitEvent.preventDefault();

    console.log(submitEvent);
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <form
        action="https://kbs-asd-test.azurewebsites.net/api/test"
        method="POST"
        className={style.form}
        onSubmit={this.handleSubmit}
      >
        <Fieldset>
          <Label htmlFor={FieldNames.Frequency}>Frequency</Label>
          <Input.Text name={FieldNames.Frequency} />
        </Fieldset>

        <Button type="submit">
          Start test
          {isSubmitting && <Icon.Fire />}
        </Button>
      </form>
    );
  }
}

export default CreateTestForm;
