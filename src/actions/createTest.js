import createGateway, { POST } from "../util/gateway";

const gateway = createGateway("https://kbs-asd-test.azurewebsites.net");

/***
 * Creates a new test environment with given configuration
 */
export default values =>
  gateway("/api/test", {
    method: POST,
    body: values
  });
