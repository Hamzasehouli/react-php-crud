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

  state = { name: "µdd" };

  submitForm = (e) => {
    e.preventDefault();
    console.log(this);
  };

  onChange = (e) => {
    console.log(e);
  };
  render() {
    return (
      <form
        onSubmit={this.submitForm}
        method="post"
        action="/api/v1/auth/signup"
        class="form"
      >
        <div class="form__control">
          <label for="name" class="form__label">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="name"
            class="form__input"
            value={this.state.username}
            onInput={(e) => this.setState({ username: e.target.value })}
          ></input>
        </div>
        <div class="form__control">
          <label for="email" class="form__label">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            class="form__input"
            value={this.state.email}
            onInput={(e) => this.setState({ email: e.target.value })}
          ></input>
        </div>
        <div class="form__control">
          <label for="email" class="form__label">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            class="form__input"
            value={this.state.password}
            onInput={(e) => this.setState({ password: e.target.value })}
          ></input>
        </div>
        <button type="submit" class="btn btn-flat">
          Signup
        </button>
        <a href="/login">You do not have an account yet? Signup here</a>
      </form>
    );
  }
}
