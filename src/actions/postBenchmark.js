import createPath from "../utils/createUrl";

export default async configuration =>
  await fetch(createPath("/benchmark"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(configuration)
  });
