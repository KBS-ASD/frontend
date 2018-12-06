import React, { Component } from "react";
import CreateTestForm from "../../molecules/CreateTestForm";
import CreateGet from "../../molecules/TestEnvironmentsOverview";
import style from "./Application.module.scss";

class Application extends Component {
  render() {
    return (
      <div>
        <div className={style.root}>
          <CreateTestForm />
        </div>

        <div className={style.root}>
          <CreateGet />
        </div>
      </div>
    );
  }
}

export default Application;
