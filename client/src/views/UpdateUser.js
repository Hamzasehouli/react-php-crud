import React, { Component } from "react";

export default class AddUser extends Component {
  render() {
    return (
      <form
        method="post"
        action="/updateuser?userid=<?php print_r($id)?>"
        className="form"
        enctype="multipart/form-data"
      >
        <div className="form__control">
          <label for="name" className="form__label">
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="form__input"
          ></input>
        </div>
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
          <label for="image" className="form__label">
            Image
          </label>

          <img
            alt="sss"
            style={{ width: 100 + "px", height: 100 + "px", display: "bloc" }}
            // src="/public/images/<?php echo $image ?>.png"
          ></img>

          <input
            name="image"
            id="image"
            type="file"
            className="form__input"
          ></input>
        </div>
        <button type="submit" className="btn btn-flat">
          Save
        </button>
      </form>
    );
  }
}
