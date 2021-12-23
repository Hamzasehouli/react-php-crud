import React, { Component } from "react";

export default class Update extends Component {
  render() {
    return (
      <form
        method="post"
        action="/adduser"
        className="form"
        encType="multipart/form-data"
      >
        <div className="form__control">
          <label htmlFor="name" className="form__label">
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
          <label htmlFor="email" className="form__label">
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
          <label htmlFor="image" className="form__label">
            Image
          </label>
          <input
            name="image"
            id="image"
            type="file"
            className="form__input"
          ></input>
        </div>
        <button type="submit" className="btn btn-flat">
          Add
        </button>
      </form>
    );
  }
}
