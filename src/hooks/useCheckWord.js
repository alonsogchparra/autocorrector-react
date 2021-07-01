import { useState } from "react";

export const useCheckWord = (newCorrections = []) => {
  const [text, setText] = useState("");

  const checkTextArea = (e) => {
    setText(e.target.value);
  };

  const checkWord = (e) => {
    let auxWords = null;

    if (e.keyCode === 32) {
      auxWords = e.target.value.split(" ");

      for (let i = 0; i < newCorrections.length; i++) {
        for (let j = 0; j < auxWords.length; j++) {
          if (
            auxWords[j].toLowerCase() === newCorrections[i]?.key.toLowerCase()
          ) {
            auxWords[j] = newCorrections[i].correction;
          }
        }
      }
      setText(auxWords.join(" "));
    }
  };

  return { text, checkTextArea, checkWord };
};
