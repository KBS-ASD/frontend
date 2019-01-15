import createPath from "../utils/createUrl";

export default async fileName => {
  const response = await fetch(createPath(`/results/${fileName}`));

  if (response.status !== 200) return {};

  return await response.json();
};
