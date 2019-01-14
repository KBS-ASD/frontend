import React, { Component } from "react";
import idx from "idx";
import getWebjobInformation from "../../actions/getWebjobInformation";

const INTERVAL = 1000;

class ServiceStatus extends Component {
  constructor(props) {
    super(props);

    this.updateStatus = this.updateStatus.bind(this);
    this.getStatusTimeout = null;

    this.state = { status: null };
  }

  componentDidMount() {
    this.updateStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.getStatusTimeout);
  }

  async updateStatus() {
    const webjobInformation = await getWebjobInformation();
    const status = idx(webjobInformation, _ => _.latest_run.status);

    this.setState({ status });

    this.getStatusTimeout = setTimeout(this.updateStatus, INTERVAL);
  }

  render() {
    const { status } = this.state;

    return <div className="ServiceStatus">Status: {status}</div>;
  }
}

export default ServiceStatus;
