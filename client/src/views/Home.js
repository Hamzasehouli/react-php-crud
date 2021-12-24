import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  // const image = require("../public/images/no-user.png");

  useEffect(() => {
    (async function () {
      const res = await fetch(`http://localhost:8000/api/v1/users`);
      const data = await res.json();

      if (res.ok) {
        setUsers(() => data.data.users);
      }
    })();
  }, []);

  async function onClick(e) {
    const id = e.target.dataset.id;
    const res = await fetch("http://localhost:8000/api/v1/users/deleteuser", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.status === 204) {
      setUsers(users.filter((user) => user.id !== id));
    }
  }

  {
    if (users.length <= 0) {
      return (
        <>
          <Link
            to="/adduser"
            style={{ marginTop: 10 + "px", display: "inline-block" }}
            className="btn btn-primary anch"
          >
            Adduser
          </Link>
          <ul className="users__list">
            <p>No users found</p>
          </ul>
        </>
      );
    }
  }

  return (
    <>
      <Link
        to="/adduser"
        style={{ marginTop: 10 + "px", display: "inline-block" }}
        className="btn btn-primary anch"
      >
        Adduser
      </Link>

      <ul className="users__list">
        {users.map((user) => {
          return (
            <li
              style={{ padding: 3 + "rem" }}
              key={user.id}
              className="users__item"
            >
              {/* <img
                alt={user.name + " photo"}
                style={{ marginRight: 20 + "px" }}
                className="users__img"
                src={image.default}
              ></img> */}

              <div className="users__details">
                <p className="users__info">Id:{user.id}</p>
                <p className="users__info">Name: {user.name}</p>
                <p className="users__info">Email: {user.email}</p>
              </div>
              <div className="users__btns">
                <Link
                  to={"/updateuser/" + user.id}
                  style={{ marginRight: 7 + "px" }}
                  className="btn btn-primary anch"
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => onClick(e)}
                  type="button"
                  href=""
                  data-id={user.id}
                  className="btn btn-danger anch"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}

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
