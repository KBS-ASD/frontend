import createPath from "../utils/createUrl";

export default async fileName => {
  const response = await fetch(createPath(`/results/${fileName}`), {
    method: "DELETE"
  });

  return await response.json();
};
