import React, { Component } from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import style from "./CreateGet.module.scss";
import getTests from "../../../actions/getTests";
import TestEnviroment from "../../../model/TestEnviroment";
import Label from "../../atoms/Label";
import Fieldset from "../../atoms/Fieldset";
import Input from "../../atoms/Input";
import getTestById from "../../../actions/getTestById";
import getFormValues from "../../../util/getFormValues";

class CreateGet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false
    };
  }

  handleSubmit = async submitEvent => {
    submitEvent.preventDefault();

    this.setState({ isSubmitting: true });

    await getTests(getFormValues(submitEvent.currentTarget.values));

    this.setState({ isSubmitting: false });
  };

  handleSubmitWithCode = async submitEvent => {
    submitEvent.preventDefault();

    this.setState({ isSubmitting: true });

    await getTestById(getFormValues(submitEvent.currentTarget.elements));

    this.setState({ isSubmitting: false });
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <div className={style.form}>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Get Latest Testresults</Button>
        </form>

        <form onSubmit={this.handleSubmitWithCode}>
          <Fieldset>
            <Label htmlFor={TestEnviroment.Id}>Test ID</Label>
            <Input.Number name={TestEnviroment.Id} min={0} />
          </Fieldset>

          <Button type="submit">Get Testresult</Button>
        </form>

        {isSubmitting && <Icon.Fire />}
      </div>
    );
  }
}

export default CreateGet;
