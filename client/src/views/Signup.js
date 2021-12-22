import React, { Component } from "react";

export default class Signup extends Component {
  render() {
    return (
      <form method="post" action="/api/v1/auth/signup" class="form">
        <div class="form__control">
          <label for="name" class="form__label">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="name"
            class="form__input"
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
