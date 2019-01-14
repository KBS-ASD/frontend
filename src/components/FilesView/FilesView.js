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
    const { showBenchmark } = this.props;
    const fileNames = await getFiles();

    if (!fileNames) return;

    this.setState({ fileNames, pagination: 5 });

    showBenchmark(fileNames[0]);
  }

  showMore = () =>
    this.setState(() => ({ pagination: this.state.pagination + 5 }));

  render() {
    const { showBenchmark, activeBenchmark } = this.props;
    const { fileNames, pagination } = this.state;

    const paginatedFilenames = fileNames.slice(0, pagination);

    return (
      <div className="FilesView">
        <h2>Benchmark history</h2>

        <button onClick={this.refresh} className="FilesView__refresh">
          Refresh
        </button>

        <ul className="FilesView__list">
          {paginatedFilenames.map((fileName, index) => (
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

        {fileNames.length >= pagination && (
          <button
            onClick={this.showMore}
            style={{ backgroundColor: "lightyellow" }}
          >
            Show more
          </button>
        )}
      </div>
    );
  }
}

FilesView.propTypes = {
  showBenchmark: PropTypes.func.isRequired
};

export default FilesView;
