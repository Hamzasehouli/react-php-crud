import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AppContext } from "../store/index";

export default function Login() {
  const email = useRef();

  const password = useRef();

  const history = useHistory();

  const ctx = useContext(AppContext);

  async function onSubmit(e) {
    console.log("ffffffffffffffffff");
    e.preventDefault();

    const body = {
      email: email.current.value,
      password: password.current.value,
    };

    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res) {
      await ctx.setLoggin(true);
      ctx.setEmailVal(data.email);
      document.cookie = `jwt=${data.token}; path=/`;
      setTimeout(() => {
        // history.replace("/");
      }, 1500);
    }
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
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
          ref={password}
          className="form__input"
        ></input>
      </div>
      <button type="submit" className="btn btn-flat">
        Login
      </button>
      <Link to="/signup">You do not have an account yet? Signup here</Link>
    </form>
  );
}
