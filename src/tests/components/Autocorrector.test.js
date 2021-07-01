import { act } from "@testing-library/react";
import { mount } from "enzyme";
import React from "react";
import { Autocorrector } from "../../components/Autocorrector";

describe("Tests on Autocorrector", () => {
  const handleNewCorrections = jest.fn();

  test("should show component correctly", () => {
    const wrapper = mount(<Autocorrector />);

    expect(wrapper).toMatchSnapshot();
  });

  test("should show form when the button Add new word is clicked", () => {
    const wrapper = mount(<Autocorrector />);

    wrapper.find("button").at(0).simulate("click");

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("form").exists()).toBe(true);
  });

  test("should misspelled input change value", () => {
    const wrapper = mount(<Autocorrector />);
    const value = "realy";

    wrapper.find("button").at(0).simulate("click");

    wrapper.find("input").at(0).simulate("change", { target: { value } });

    console.log("Misspelled input", wrapper.find("input").at(0).prop("value"));

    expect(wrapper.find("input").at(0).prop("value")).toBe(value);
  });

  test("should right word input change value", () => {
    const wrapper = mount(<Autocorrector />);
    const value = "really";

    wrapper.find("button").at(0).simulate("click");

    wrapper.find("input").at(1).simulate("change", { target: { value } });

    console.log("Right word input", wrapper.find("input").at(1).prop("value"));
    expect(wrapper.find("input").at(1).prop("value")).toBe(value);
  });

  test("should show misspelled already exist message", () => {
    const wrapper = mount(<Autocorrector />);
    const val = "realy";
    const value = "really";

    wrapper.find("button").at(0).simulate("click");

    const addWordForm = wrapper.find("form").prop("onSubmit");

    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: val } });
    wrapper.find("input").at(1).simulate("change", { target: { value } });

    act(() => {
      handleNewCorrections();
    });

    // wrapper.find(".btn_add").simulate("click");

    // addWordForm({ preventDefault() {} });

    expect(wrapper.find(".already_exists").exists()).toBe(true);

    console.log(wrapper.html());
  });
});
