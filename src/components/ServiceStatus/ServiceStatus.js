import React, { Component } from "react";
import idx from "idx";
import { distanceInWordsToNow } from "date-fns";
import getWebjobInformation from "../../actions/getWebjobInformation";
import "./ServiceStatus.scss";

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
    this.setState({ webjobInformation });

    this.getStatusTimeout = setTimeout(this.updateStatus, INTERVAL);
  }

  render() {
    const { webjobInformation } = this.state;

    const status = idx(webjobInformation, _ => _.latest_run.status);
    const outputUrl = idx(webjobInformation, _ => _.latest_run.output_url);
    const startTime = idx(webjobInformation, _ => _.latest_run.start_time);
    const duration = idx(webjobInformation, _ => _.latest_run.duration);

    return (
      <div className="ServiceStatus">
        <h2>Latest run</h2>

        <div className="infoField">Status: {status}</div>

        <div className="infoField">
          Start time:{" "}
          <span title={startTime}>
            {distanceInWordsToNow(startTime, { includeSeconds: true })} ago
          </span>
        </div>

        <div className="infoField">Duration: {duration}</div>

        <div className="infoField">
          Output (protected):{" "}
          <a
            href={outputUrl}
            title={outputUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {outputUrl}
          </a>
        </div>
      </div>
    );
  }
}

export default ServiceStatus;
