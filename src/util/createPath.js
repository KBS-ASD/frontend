/**
 * Create path util, this will return the '/' path if the path is invalid
 */
export default (...args) => {
  try {
    return createPath(...args);
  } catch (e) {
    console.error(e);
  }

  return "/";
};

/**
 * This function is used ot replace segments of the given string
 * with values from the parameters object
 */
const createPath = (path, params) =>
  path.split("/").reduce((accumulator, segment) => {
    if (!segment) return accumulator;

    accumulator += "/";

    if (segment[0] !== ":") {
      accumulator += segment;
    } else {
      const value = params[segment.slice(1)];

      if (typeof value !== "string" || !value) {
        throw new CreatePathError(
          `Invalid parameter in path '${path}' for segment '${segment.slice(
            1
          )}'`
        );
      }

      accumulator += value;
    }

    return accumulator;
  }, "");

class CreatePathError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
