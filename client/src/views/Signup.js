import React, { useContext, useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AppContext } from "../store/index";

export default function Signup() {
  const [err, setErr] = useState({ status: true, message: "" });
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const ctx = useContext(AppContext);
  async function submitForm(e) {
    e.preventDefault();

    setIsloading(true);
    const body = {
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
    };

    if (!body.email.trim() || !body.password.trim() || !body.username.trim()) {
      setErr({ status: false, message: "Please fill all the required fields" });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    const res = await fetch(`http://localhost:8000/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setErr({ status: false, message: data.message });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    setIsloading(false);

    document.cookie = `jwt=${data.token}; path=/`;

    ctx.setLoggin(true);
    ctx.setEmailVal(data.email);
    history.replace("/");
  }

  if (!err.status) {
    return <p className="form">{err.message}</p>;
  }

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      method="post"
      action="/api/v1/auth/signup"
      className="form"
    >
      <h2 className="form__heading">Sign up</h2>
      <div className="form__control">
        {/* <label htmlFor="name" className="form__label">
          Username
        </label> */}
        <input
          placeholder="Username"
          name="username"
          type="text"
          id="name"
          className="form__input"
          ref={username}
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
          className="form__input"
          ref={email}
        ></input>
      </div>
      <div className="form__control">
        {/* <label htmlFor="email" className="form__label">
          Password
        </label> */}
        <input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          className="form__input"
          ref={password}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary mr">
        {isLoading ? "wait" : "Sign up"}
      </button>
      <Link className="btn btn-empty" to="/login">
        Log in
      </Link>
    </form>
  );
}
