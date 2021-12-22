import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form method="post" action="/api/v1/auth/login" className="form">
        <div className="form__control">
          <label for="email" className="form__label">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="form__input"
          ></input>
        </div>
        <div className="form__control">
          <label for="email" className="form__label">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="form__input"
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
