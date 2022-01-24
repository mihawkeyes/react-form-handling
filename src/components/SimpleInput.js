import React, { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [wasNameInputTouched, setWasNameInputTouched] = useState(false);
  const [wasEmailInputTouched, setWasEmailInputTouched] = useState(false);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && enteredEmail.match(mailformat);
  const nameInputIsInvalid = !enteredNameIsValid && wasNameInputTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && wasEmailInputTouched;

  let formIsInvalid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsInvalid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    setWasNameInputTouched(true);
    setWasEmailInputTouched(true);
    if (!enteredNameIsValid) {
      return;
    }
    setEnteredName("");
    setEnteredEmail("");
    setWasNameInputTouched(false);
    setWasEmailInputTouched(false);
  };

  const nameInputBlurHandler = (event) => {
    setWasNameInputTouched(true);
  };
  const emailInputBlurHandler = (event) => {
    setWasEmailInputTouched(true);
  };

  const formNameStyle = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const formEmailStyle = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={formNameStyle}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={formEmailStyle}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && (
          <p className="error-text">email must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsInvalid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
