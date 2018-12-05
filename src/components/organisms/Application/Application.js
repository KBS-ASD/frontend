import React, { Component } from "react";
import CreateTestForm from "../../molecules/CreateTestForm";
import style from "./Application.module.scss";

class Application extends Component {
  render() {
    return (
      <div className={style}>
        <CreateTestForm />
      </div>
    );
  }
}

export default Application;
