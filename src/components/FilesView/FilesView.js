import React, { Component } from "react";
import PropTypes from "prop-types";
import { parse as parseQueryString } from "querystring";
import removeBenchmark from "../../actions/removeBenchmark";
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

    let initialFilename = null;

    if (!this.state.fileNames.length)
      initialFilename = parseQueryString(window.location.search.slice(1))
        .fileName;

    const fileNames = await getFiles();

    if (!fileNames) return;

    this.setState({ fileNames, pagination: 5 });

    showBenchmark(initialFilename || fileNames[0]);
  }

  removeFile = async fileName => {
    if (!window.confirm(`Do you really want to remove ${fileName}`)) return;

    await removeBenchmark(fileName);
    await this.refresh();
  };

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
              className={`FilesView__listItem ${
                activeBenchmark === fileName
                  ? "FilesView__listItem--active"
                  : ""
              }`}
            >
              <button title={fileName} onClick={() => showBenchmark(fileName)}>
                {fileName}
              </button>
              <button
                className="FilesView__listItem__removeButton"
                onClick={() => this.removeFile(fileName)}
              >
                x
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
