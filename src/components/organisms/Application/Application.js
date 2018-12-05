import React, { Component } from "react";
import CreateTestForm from "../../molecules/CreateTestForm";
import CreateGet from "../../molecules/CreateGet";
import style from "./Application.module.scss";

class Application extends Component {
  render() {
    return (
      <div>
        <div className={style}>
          <CreateTestForm />
        </div>

        <div className={style}>
          <CreateGet />
        </div>
      </div>
    );
  }
}

export default Application;
