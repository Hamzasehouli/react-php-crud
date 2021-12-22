import React, { Component } from "react";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();

    const body = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    const res = await fetch(`http://localhost:8000/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
  };

  render() {
    return (
      <form
        onSubmit={this.submitForm}
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
            value={this.state.username}
            onInput={(e) => this.setState({ username: e.target.value })}
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
            className="form__input"
            value={this.state.password}
            onInput={(e) => this.setState({ password: e.target.value })}
          ></input>
        </div>
        <button type="submit" className="btn btn-flat">
          Signup
        </button>
        <a href="/login">You do not have an account yet? Signup here</a>
      </form>
    );
  }
}
