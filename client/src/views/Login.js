import React, { Component } from "react";
import store from "../store/reducers";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      email: "",
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const body = { email: this.state.email, password: this.state.password };
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
    if (res) {
      document.cookie = `jwt=${data.token}; path=/`;
      store.dispatch({ type: "signin" });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form__control">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="form__input"
            value={this.state.email}
            onInput={(e) => this.setState({ email: e.target.value })}
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
            value={this.state.password}
            className="form__input"
            onInput={(e) => this.setState({ password: e.target.value })}
          ></input>
        </div>
        <button type="submit" className="btn btn-flat">
          Login
        </button>
        <a href="/signup">You do not have an account yet? Signup here</a>
      </form>
    );
  }
}
