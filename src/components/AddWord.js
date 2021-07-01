import React from "react";

export const AddWord = ({
  handleNewCorrections,
  handlerInputMisspelledChange,
  misspelled,
  setRightWord,
  rightWord,
  keyExist,
  handlerCancelButton,
}) => {
  return (
    <>
      <form
        className="mb-5 mt-3 animate__animated animate__fadeIn"
        onSubmit={handleNewCorrections}
      >
        <label htmlFor="key" className="form-label">
          Misspelled word
        </label>
        <input
          type="text"
          className="form-control misspelled"
          autoComplete="off"
          name="key"
          onChange={handlerInputMisspelledChange}
          value={misspelled}
          required
        />
        <label htmlFor="key" className="form-label">
          Right word
        </label>
        <input
          type="text"
          className="form-control mb-1 right-word"
          autoComplete="off"
          name="correction"
          onChange={(e) => setRightWord(e.target.value)}
          value={rightWord}
          required
        />

        <div>
          {keyExist && (
            <p className="form-text text-center text-danger mt-3 already_exists">
              The misspelled word already exists
            </p>
          )}
        </div>

        <div className="d-flex mt-4">
          <button className="btn btn-primary form-control me-2 btn_add">Add</button>
          <button
            className="btn btn-danger form-control btn_cancel"
            onClick={handlerCancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
