import React, { Component } from "react";

export default class Update extends Component {
  render() {
    return (
      <form
        method="post"
        action="/adduser"
        class="form"
        enctype="multipart/form-data"
      >
        <div class="form__control">
          <label for="name" class="form__label">
            Name
          </label>
          <input name="name" type="text" id="name" class="form__input"></input>
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
          <label for="image" class="form__label">
            Image
          </label>
          <input
            name="image"
            id="image"
            type="file"
            class="form__input"
          ></input>
        </div>
        <button type="submit" class="btn btn-flat">
          Add
        </button>
      </form>
    );
  }
}
