import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../store";

export default function Update() {
  const email = useRef();

  const name = useRef();

  const history = useHistory();

  const ctx = useContext(AppContext);

  const [err, setErr] = useState({ status: true, message: "" });
  const [isLoading, setIsloading] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: email.current.value,
      firstName: name.current.value,
    };

    if (!body.email.trim() || !body.firstName.trim()) {
      setErr({ status: false, message: "Please fill all the required fields" });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res) {
      history.replace("/");
    }
  }

  if (!err.status) {
    return <p className="form">{err.message}</p>;
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
      <h2 className="form__heading">Add user</h2>
      <div className="form__control">
        {/* <label htmlFor="name" className="form__label">
          Name
        </label> */}
        <input
          placeholder="Name"
          name="name"
          type="text"
          id="name"
          ref={name}
          className="form__input"
        ></input>
      </div>
      <div className="form__control">
        {/* <label htmlFor="email" className="form__label">
          Email
        </label> */}
        <input
          placeholder="Email"
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
