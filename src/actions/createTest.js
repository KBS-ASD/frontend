import gateway, { POST } from "../util/gateway";

/***
 * Creates a new test environment with given configuration
 */
export default values =>
  gateway("https://kbs-asd-test.azurewebsites.net/api/test", {
    method: POST,
    body: values
  });
