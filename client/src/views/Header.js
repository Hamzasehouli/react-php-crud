import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../store/index";

export default function Header() {
  const history = useHistory();

  const ctx = useContext(AppContext);

  const onClick = function () {
    document.cookie = "jwt=;path=/";
    ctx.setLoggin(false);
    ctx.setEmailVal("");
    history.replace("/login");
  };
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

          {ctx.isLoggedIn ? (
            <>
              <li className="nav__item">
                <button
                  onClick={() => onClick()}
                  type="submit"
                  className="btn btn-primary"
                >
                  Log out
                </button>
              </li>
              <li className="nav__item">
                <p>{ctx.email}</p>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
