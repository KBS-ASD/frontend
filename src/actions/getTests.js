import createGateway, { GET } from "../util/gateway";

const gateway = createGateway("https://kbs-asd-test.azurewebsites.net");

/***
 * Gets the latest testresults
 */
export default () =>
  gateway("/api/test", {
    method: GET
  });
