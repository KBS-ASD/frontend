import createPath from "../utils/createUrl";

export default async fileName => {
  const response = await fetch(createPath(`/results/${fileName}`), {
    method: "DELETE"
  });

  if (response.status !== 204) return {};

  return await response.json();
};
