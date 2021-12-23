import React, { useContext, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
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
  const history = useHistory();

  console.log(history);

  const ctx = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const res = await fetch(`http://localhost:8000/api/v1/auth/protect`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          jwt: document.cookie,
        }),
      });

      console.log(res);

      if (!res.ok) {
        setIsLoading(false);
        ctx.setLoggin(false);
        return;
      }
      const data = await res.json();

      ctx.setLoggin(true);
      ctx.setEmailVal(data.email);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p style={{ fontSize: 3 + "rem" }}>Processing..............</p>;
  }

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">{ctx.isLoggedIn ? <Home /> : <Login />}</Route>
        <Route path="/signup">{ctx.isLoggedIn ? <Home /> : <Signup />}</Route>
        <Route path="/login">{ctx.isLoggedIn ? <Home /> : <Login />}</Route>
        <Route path="/updateuser/:userid">
          {ctx.isLoggedIn ? <Update /> : <Login />}
        </Route>
        <Route path="/adduser">{ctx.isLoggedIn ? <Add /> : <Login />}</Route>
        <Route path="*">
          <p>error</p>
        </Route>
      </Switch>
      {/* <main></main>
        <Footer></Footer> */}
    </Router>
  );
};
