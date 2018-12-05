import queryString from "querystring";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

export default (path, { qs = {}, body, ...args }) => {
  // Remove null values from qs object
  Object.keys(qs).forEach(key => qs[key] == null && delete qs[key]);

  const query = queryString.stringify(qs);

  return fetch(`${path}?${query}`, { ...args, body: JSON.stringify(body) });
};
