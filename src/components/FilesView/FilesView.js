import React, { Component } from "react";
import PropTypes from "prop-types";
import getFiles from "../../actions/getFiles";
import "./FilesView.scss";

class FilesView extends Component {
  constructor(props) {
    super(props);

    this.state = { fileNames: [] };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  async refresh() {
    const fileNames = await getFiles();

    this.setState({ fileNames });
  }

  render() {
    const { showBenchmark, activeBenchmark } = this.props;
    const { fileNames } = this.state;

    return (
      <div className="FilesView">
        <button onClick={this.refresh} className="FilesView__refresh">
          Refresh
        </button>

        <ul className="FilesView__list">
          {fileNames.map((fileName, index) => (
            <li
              key={index}
              className={`FilesView__listItem ${activeBenchmark ===
                fileName.replace(".json", "") &&
                "FilesView__listItem--active"}`}
            >
              <button title={fileName} onClick={() => showBenchmark(fileName)}>
                {fileName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

FilesView.propTypes = {
  showBenchmark: PropTypes.func.isRequired
};

export default FilesView;
