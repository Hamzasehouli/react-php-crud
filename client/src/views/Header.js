import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <ul className="nav__list">
            {/* <li className="nav__item">
              <form action="/api/v1/auth/logout" method="post">
                <button type="submit" className="btn btn-primary">
                  Log out
                </button>
              </form>
            </li> */}
            <li className="nav__item">
              <p></p>
            </li>

            <li className="nav__item">
              <Link className="nav__link btn-primary anch" to="/login">
                login
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link btn-primary anch" to="/signup">
                signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
