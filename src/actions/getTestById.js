import createGateway, { GET } from "../util/gateway";

const gateway = createGateway("https://kbs-asd-test.azurewebsites.net");

/***
 * Gets testresult based on Id
 */
export default ({ id }) =>
  gateway(`/api/test/${id}`, {
    method: GET
  });
