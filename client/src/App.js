import React, { Component, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./views/Header";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Add from "./views/AddUser";
import Update from "./views/UpdateUser";
// import Footer from "./views/Footer";
import { AppContext } from "./store/index";

export const App = function () {
  const ctx = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/auth/protect`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jwt: document.cookie,
      }),
    })
      .then((res) => {
        const data = res.json();

        return data;
      })
      .then((data) => {
        ctx.setLoggin(true);
        ctx.setEmailVal(data.email);
      });
  });

  return (
    <Router>
      <Header></Header>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Home></Home>
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/update">
        <Update />
      </Route>
      <Route path="/Add">
        <Add />
      </Route>
      {/* <main></main>
        <Footer></Footer> */}
    </Router>
  );
};
