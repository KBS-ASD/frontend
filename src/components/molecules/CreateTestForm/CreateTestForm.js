import React, { Component } from "react";
import createTest from "../../../actions/createTest";
import getFormValues from "../../../util/getFormValues";
import { CreateTestFieldNames } from "../../../enum/FieldNames";
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

  handleSubmit = async submitEvent => {
    submitEvent.preventDefault();

    this.setState({ isSubmitting: true });

    await createTest(getFormValues(submitEvent.currentTarget.elements));

    this.setState({ isSubmitting: false });
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.Name}>Name</Label>
          <Input.Text name={CreateTestFieldNames.Name} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.Frequency}>Frequency</Label>
          <Input.Number name={CreateTestFieldNames.Frequency} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.Size}>Size</Label>
          <Input.Number name={CreateTestFieldNames.Size} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.Duration}>Duration</Label>
          <Input.Date name={CreateTestFieldNames.Duration} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.BatchSize}>BatchSize</Label>
          <Input.Number name={CreateTestFieldNames.BatchSize} min={0} />
        </Fieldset>

        <Fieldset>
          <Label htmlFor={CreateTestFieldNames.Protocol}>Protocol</Label>
          <Input.Select
            name={CreateTestFieldNames.Protocol}
            options={[["AMQP", "amqp"], ["SB", "sb"]]}
          />
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
