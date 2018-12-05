import React from "react";
import { mount } from "enzyme";
import Icon from "./index";

describe("Icon", () => {
  it("Should render an icon", () => {
    const wrapper = mount(<Icon.ArrowDropDown />);

    expect(wrapper.find("svg")).toExist();
  });
});
