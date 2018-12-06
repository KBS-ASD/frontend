import createGateway, { GET } from "../util/gateway";

const gateway = createGateway("https://kbs-asd-test.azurewebsites.net");

/***
 * Gets the latest testresults
 */
export default async () => {
  const response = await gateway("/api/test", {
    method: GET
  });

  const { status } = response;

  if (status === 200) return { status, data: await response.json() };
  return { status };
};
