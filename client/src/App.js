import React, { Component } from "react";
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
import store from "./store/reducers.js";

(function () {
  store.dispatch({ type: "setToken", payload: "hhhhh" });
  console.log("fff");
  store.subscribe(() => console.log(store.getState()));
})();

export default class App extends Component {
  constructor() {
    super();
    this.isLoggedIn = false;
    this.token = "";
  }
  async componentDidMount() {
    const res = await fetch(``, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {},
    });
    const data = await res.json();
    console.log(data);
  }
  render() {
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
  }
}
