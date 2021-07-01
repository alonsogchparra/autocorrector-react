import React, { useState } from "react";
import { useCheckWord } from "../hooks/useCheckWord";
import { AddWord } from "./AddWord";
import "./styles.css";

const CORRECTIONS = {
  realy: "really",
  wierd: "weird",
};

export const Autocorrector = () => {
  const [newCorrections, setNewCorrections] = useState(
    Object.keys(CORRECTIONS).map((word) => ({
      key: word,
      correction: CORRECTIONS[word],
    }))
  );

  const { text, checkTextArea, checkWord } = useCheckWord(newCorrections);
  const [misspelled, setMisspelled] = useState("");
  const [rightWord, setRightWord] = useState("");
  const [addNewWord, setAddNewWord] = useState(false);
  const [keyExist, setKeyExist] = useState(false);

  const handlerInputMisspelledChange = (e) => {
    setKeyExist(false);
    setMisspelled(e.target.value);
  };

  const handleNewCorrections = (e) => {
    e.preventDefault();

    for (let i = 0; i < newCorrections.length; i++) {
      if (newCorrections[i].key.toLowerCase() === misspelled.toLowerCase()) {
        setKeyExist(true);
        setMisspelled("");
        setRightWord("");
        return;
      }
    }

    if (!keyExist) {
      setNewCorrections([
        ...newCorrections,
        {
          key: misspelled,
          correction: rightWord,
        },
      ]);
    }

    setMisspelled("");
    setRightWord("");
    setAddNewWord(!addNewWord);
  };

  const handlerCancelButton = () => {
    setKeyExist(false);
    setMisspelled("");
    setRightWord("");
    setAddNewWord(!addNewWord);
  };

  return (
    <div className="container animate__animated animate__fadeInUp animate__slow">
      {!addNewWord && (
        <div className="col-12 animate__animated animate__fadeIn mb-5 add-word-corrector">
          <h3 className="text-center">
            You can add new words to the corrector
          </h3>

          <div className="text-center col-8 offset-2 col-md-6 offset-md-3">
            <button
              className="btn btn-primary form-control"
              onClick={() => setAddNewWord(!addNewWord)}
            >
              Add new words
            </button>
          </div>
        </div>
      )}

      {addNewWord && (
        <AddWord
          handleNewCorrections={handleNewCorrections}
          handlerCancelButton={handlerCancelButton}
          handlerInputMisspelledChange={handlerInputMisspelledChange}
          misspelled={misspelled}
          setRightWord={setRightWord}
          rightWord={rightWord}
          keyExist={keyExist}
        />
      )}

      <hr />

      <div className="row mt-3">
        <div className="col-12 col-md-6 px-4 line-divided">
          <h4 className="text-center mb-4">
            Text Area (Check the Autocorrection)
          </h4>
          <textarea
            className="form-control"
            value={text}
            onChange={checkTextArea}
            onKeyDown={checkWord}
            name=""
            id=""
          ></textarea>
        </div>

        <div className="col-12 col-md-6 px-4 mt-4 mt-md-0">
          <h4 className="text-center mb-4">Correction's List</h4>
          <pre>{JSON.stringify(newCorrections, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
