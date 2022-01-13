import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function AddUser() {
  const email = useRef();
  const name = useRef();

  const history = useHistory();

  const params = useParams();
  const userid = params.userid;
  const [err, setErr] = useState({ status: true, message: "" });
  const [isLoading, setIsloading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:8000/api/v1/users/getuser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: userid }),
      });
      const data = await res.json();

      setUser(data.data.users);
    })();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      name: name.current.value,
      email: email.current.value,
      id: userid,
    };

    if (!body.email.trim() && !body.name.trim()) {
      setErr({ status: false, message: "Please fill all the required fields" });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    if (!body.id) {
      setErr({ status: false, message: "Id is missing" });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }

    const res = await fetch("http://localhost:8000/api/v1/users/updateuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = res.json();

    if (!res.ok) {
      setErr({ status: false, message: data.message });
      setIsloading(false);
      setTimeout(() => {
        setErr({ status: true, message: "" });
      }, 1500);
      return;
    }
    setIsloading(false);

    history.replace("/");
  }

  if (!err.status) {
    return <p className="form">{err.message}</p>;
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className="form">
      <h2 className="form__heading">Edit user</h2>
      <div className="form__control">
        {/* <label htmlFor="name" className="form__label">
          Name
        </label> */}
        <input
          placeholder={user.name}
          ref={name}
          name="name"
          type="text"
          id="name"
          className="form__input"
        ></input>
      </div>
      <div className="form__control">
        {/* <label htmlFor="email" className="form__label">
          Email
        </label> */}
        <input
          placeholder={user.email}
          ref={email}
          name="email"
          type="email"
          id="email"
          className="form__input"
        ></input>
      </div>
      {/* <div className="form__control">
          <label htmlFor="image" className="form__label">
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
        </div> */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
