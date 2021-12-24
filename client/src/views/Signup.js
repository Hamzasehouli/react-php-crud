import React, { useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { AppContext } from "../store/index";

export default function Signup() {
  const history = useHistory();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const ctx = useContext(AppContext);
  async function submitForm(e) {
    e.preventDefault();
    const body = {
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
    };

    const res = await fetch(`http://localhost:8000/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res) {
      document.cookie = `jwt=${data.token}; path=/`;

      ctx.setLoggin(true);
      ctx.setEmailVal(data.email);
      history.replace("/");
    }
  }

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      method="post"
      action="/api/v1/auth/signup"
      className="form"
    >
      <div className="form__control">
        <label htmlFor="name" className="form__label">
          Username
        </label>
        <input
          name="username"
          type="text"
          id="name"
          className="form__input"
          ref={username}
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
          className="form__input"
          ref={email}
        ></input>
      </div>
      <div className="form__control">
        <label htmlFor="email" className="form__label">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          className="form__input"
          ref={password}
        ></input>
      </div>
      <button type="submit" className="btn btn-flat">
        Signup
      </button>
      <Link to="/login">You do not have an account yet? Signup here</Link>
    </form>
  );
}
