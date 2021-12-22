import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <>
        <a
          href="/adduser"
          style={{ marginTop: 10 + "px", display: "inline-block" }}
          className="btn btn-primary anch"
        >
          Adduser
        </a>

        <ul className="users__list">
          <li className="users__item">
            <img
              alt="ss"
              style={{ marginRight: 20 + "px" }}
              className="users__img"
            ></img>

            <img
              alt="éé"
              style={{ marginRight: 20 + "px" }}
              className="users__img"
            ></img>

            <div className="users__details">
              <p className="users__info"></p>
              <p className="users__info"></p>
              <p className="users__info"></p>
            </div>
            {/* <div className="users__btns"><a href="/updateuser?userid=" style="margin-right: 7px;"
                 className="btn btn-primary anch">Edit</a><a href=""
                    className="btn btn-danger anch">Delete</a>
                </div> */}
          </li>
          {/* <a
            href="/adduser"
            style={{ marginTop: 10 + "px", display: "inline-block" }}
            className="btn btn-primary anch"
          >
            Add user
          </a> */}
        </ul>
      </>
    );
  }
}
