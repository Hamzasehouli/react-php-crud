import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../store";

export default function Update() {
  const email = useRef();

  const name = useRef();

  const history = useHistory();

  const ctx = useContext(AppContext);

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      email: email.current.value,
      firstName: name.current.value,
    };

    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);

    if (res) {
      history.replace("/");
    }
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
      <div className="form__control">
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          ref={name}
          className="form__input"
        ></input>
      </div>
      <div className="form__control">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          ref={email}
          className="form__input"
        ></input>
      </div>
      {/* <div className="form__control">
        <label htmlFor="image" className="form__label">
          Image
        </label>
        <input
          name="image"
          id="image"
          type="file"
          className="form__input"
        ></input>
      </div> */}
      <button type="submit" className="btn btn-flat">
        Add
      </button>
    </form>
  );
}
