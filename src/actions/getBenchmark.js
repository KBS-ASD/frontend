import createPath from "../utils/createUrl";

export default async fileName => {
  const response = await fetch(createPath(`/results/${fileName}`));

  return await response.json();
};
