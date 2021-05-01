import { createStore } from "redux";

const INITIAL_STATE = {
  authenticated: false,
  username: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return { ...state, authenticated: action.payload };
    case "CHANGE_USERNAME":
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer);
