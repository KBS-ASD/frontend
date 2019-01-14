import createPath from "../utils/createUrl";

export default async () => {
  const response = await fetch(createPath("/results"));

  return await response.json();
};
