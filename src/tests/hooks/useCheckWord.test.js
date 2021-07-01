import { act, renderHook } from "@testing-library/react-hooks";
import { useCheckWord } from "../../hooks/useCheckWord";

describe("Tests on useCheckWord", () => {
  const correctionArray = [
    {
      key: "realy",
      correction: "really",
    },
    {
      key: "wierd",
      correction: "weird",
    },
    {
      key: "satl",
      correction: "salt",
    },
  ];

  test("should return text empty and check if checkTextArea and checkWord are functions", () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCheckWord(correctionArray)
    );
    console.log("Result:", result.current);

    const { text, checkTextArea, checkWord } = result.current;

    // await waitForNextUpdate();

    expect(text).toBe("");
    expect(typeof checkTextArea).toBe("function");
    expect(typeof checkWord).toBe("function");
  });

  test("should change text according the target.value on checkTextArea", () => {
    const { result } = renderHook(() => useCheckWord(correctionArray));

    const { checkTextArea } = result.current;

    act(() => {
      checkTextArea({
        target: {
          value: "realy",
        },
      });
    });

    const { text } = result.current;

    expect(text).toBe("realy");
  });

  test("should correct the misspelled word", () => {
    const { result } = renderHook(() => useCheckWord(correctionArray));

    const { checkWord } = result.current;

    act(() => {
      checkWord({ keyCode: 32, target: { value: "realy wierd house satl" } });
    });

    const { text } = result.current;

    console.log("TEXT", text);

    expect(text.trim()).toBe("really weird house salt");
  });
});
