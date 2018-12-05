import React, { Component } from "react";
import FieldNames from "../../../enum/FieldNames";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Label from "../../atoms/Label";
import Fieldset from "../../atoms/Fieldset";
import Input from "../../atoms/Input";
import style from "./CreateTestForm.module.scss";
import createTest from "../../../actions/createTest";

class CreateTestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false
    };
  }

  handleSubmit = async submitEvent => {
    submitEvent.preventDefault();

    this.setState({ isSubmitting: true });

    try {
      await createTest({
        [FieldNames.Frequency]: 50,
        [FieldNames.Size]: 50,
        [FieldNames.Duration]: 50,
        [FieldNames.BatchSize]: 50,
        [FieldNames.Protocol]: 50
      });
    } catch (error) {
      this.setState({ error, isSubmitting: false });
    }

    this.setState({ isSubmitting: false });
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <Fieldset>
          <Label htmlFor={FieldNames.Frequency}>Frequency</Label>
          <Input.Number name={FieldNames.Frequency} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={FieldNames.Size}>Size</Label>
          <Input.Number name={FieldNames.Size} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={FieldNames.Duration}>Duration</Label>
          <Input.Date name={FieldNames.Duration} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={FieldNames.BatchSize}>BatchSize</Label>
          <Input.Number name={FieldNames.BatchSize} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={FieldNames.Protocol}>Protocol</Label>
          <Input.Text name={FieldNames.Protocol} />
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
