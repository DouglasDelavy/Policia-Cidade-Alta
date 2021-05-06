import { createStore } from "redux";

const INITIAL_STATE = {
  authenticated: false,
  username: "",
  form: {
    name: "",
    description: "",
    status: 1,
    prisionTime: 1,
    penality: 1,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return { ...state, authenticated: action.payload };
    case "CHANGE_USERNAME":
      return { ...state, username: action.payload };
    case "CHANGE_FORM_NAME":
      return { ...state, form: { ...state.form, name: action.payload } };
    case "CHANGE_FORM_DESCIPTION":
      return { ...state, form: { ...state.form, description: action.payload } };
    case "CHANGE_FORM_STATUS":
      return {
        ...state,
        form: { ...state.form, status: action.payload },
      };
    case "CHANGE_FORM_PRISION_TIME":
      return {
        ...state,
        form: { ...state.form, prisionTime: action.payload },
      };
    case "CHANGE_FORM_PENALITY":
      return {
        ...state,
        form: { ...state.form, penality: action.payload },
      };

    case "RESET_FORM":
      return {
        ...state,
        form: {
          name: "",
          description: "",
          status: 1,
          prisionTime: 1,
          penality: 1,
        },
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
