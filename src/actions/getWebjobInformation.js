import createPath from "../utils/createUrl";

export default async () => {
  const response = await fetch(createPath("/benchmark"));

  return await response.json();
};
