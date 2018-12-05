import PropTypes from "prop-types";

const configValidator = {
  api: PropTypes.shape({
    controller: PropTypes.shape({
      host: "https://kbs-asd-test.azurewebsites.net/",
      path: "/api/v1"
    }).isRequired
  })
};

export default config =>
  PropTypes.checkPropTypes(configValidator, config, "prop", "config");
