import createPath from "./createPath";

describe("util/createPath", () => {
  it("Should add parameter on correct position", () => {
    const result = createPath("/test/:testId", { trackId: "myId" });

    expect(result).toEqual("/test/myId");
  });
});
