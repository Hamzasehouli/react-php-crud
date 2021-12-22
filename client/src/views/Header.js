import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <a href="/">Home</a>
          <ul className="nav__list">
            <li className="nav__item">
              <form action="/api/v1/auth/logout" method="post">
                <button type="submit" className="btn btn-primary">
                  Log out
                </button>
              </form>
            </li>
            <li className="nav__item">
              <p></p>
            </li>

            <li className="nav__item">
              <a className="nav__link btn-primary anch" href="/login">
                login
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link btn-primary anch" href="/signup">
                signup
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
