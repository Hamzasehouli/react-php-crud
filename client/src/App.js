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
import Update from "./views/Update";
// import Footer from "./views/Footer";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route exact path="/"></Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/update">
          <Update />
        </Route>
        {/* <main></main>
        <Footer></Footer> */}
      </Router>
    );
  }
}
