import { shallow } from "enzyme";
import React from "react";
import { AddWord } from "../../components/AddWord";

//  TODO: Create test(s) for AddWord component

describe("Tests on AddWord", () => {
  const handleNewCorrections = jest.fn();
  const handlerInputMisspelledChange = jest.fn();
  const setRightWord = jest.fn();
  const keyExist = false;

  test("should show component correctly", () => {
    const wrapper = shallow(<AddWord />);

    expect(wrapper).toMatchSnapshot();
  });

  test("should not add an existing misspelled word", () => {
    let wrapper = shallow(
      <AddWord
        handleNewCorrections={handleNewCorrections}
        misspelled={""}
        keyExist={keyExist}
        handlerInputMisspelledChange={handlerInputMisspelledChange}
        setRightWord={setRightWord}
      />
    );

    const value = "realy";

    wrapper.find("input").at(0).simulate("change", { target: { value } });

    const formSubmit = wrapper.find("form").prop("onSubmit");
    console.log("INPUt", wrapper.find("input").at(0).prop("value"));

    console.log(wrapper.html());

    formSubmit({ preventDefault() {} });

    console.log(wrapper.html());

    expect(handleNewCorrections).toBeCalledTimes(1);
    // expect(wrapper.find(".already_exists").exists()).toBe(true);
    expect(wrapper.find(".misspelled").prop("value")).toBe("");
    // expect(wrapper.find("keyExist")).toBe(true);
  });
});
