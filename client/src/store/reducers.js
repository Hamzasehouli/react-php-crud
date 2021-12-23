import { createStore, combineReducers } from "redux";

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */

const loggedReducer = function (state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case "signin":
      return { isLoggedIn: true };
    case "logout":
      return { isLoggedIn: false };
    default:
      return state;
  }
};
const tokenReducer = function (state = { token: "" }, action) {
  if (action.type === "setToken") {
    return { token: action.payload };
  }
  return state;
};

const allReducers = combineReducers({
  loggedReducer,
  tokenReducer,
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default createStore(allReducers);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

// store.subscribe(() => console.log(store.getState()));

// // The only way to mutate the internal state is to dispatch an action.
// // The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: "counter/incremented" });
// // {value: 1}
// store.dispatch({ type: "counter/incremented" });
// // {value: 2}
// store.dispatch({ type: "counter/decremented" });
// {value: 1}
