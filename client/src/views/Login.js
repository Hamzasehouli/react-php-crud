import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../store/index";

export default function Login() {
  const email = useRef();

  const [err, setErr] = useState({ status: true, message: "" });
  const [isLoading, setIsloading] = useState(false);

  const password = useRef();

  const ctx = useContext(AppContext);

  async function onSubmit(e) {
    e.preventDefault();
    setIsloading(true);

    const body = {
      email: email.current.value,
      password: password.current.value,
    };

    if (!body.email.trim() || !body.password.trim()) {
      setErr({ status: false, message: "Please fill all the required fields" });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
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

    await ctx.setLoggin(true);
    ctx.setEmailVal(data.email);
    document.cookie = `jwt=${data.token}; path=/`;
    setTimeout(() => {
      // history.replace("/");
    }, 1500);
  }

  if (!err.status) {
    return <p className="form">{err.message}</p>;
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
      <h2 className="form__heading">Log in</h2>
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
          ref={password}
          className="form__input"
        ></input>
      </div>
      <button type="submit" className="btn btn-primary mr">
        {isLoading ? "wait" : "Login"}
      </button>
      <Link className="btn btn-empty" to="/signup">
        Sign up
      </Link>
    </form>
  );
}
