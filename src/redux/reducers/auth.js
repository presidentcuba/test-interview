import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/auth";
import Cookies from "js-cookie";
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo,
  listUser: {},
  isLoading: false,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case LOGIN_SUCCESS: {
      Cookies.set("web-token", action.payload.data.token);
      return { ...state, isLoading: false, userInfo: action.payload.data };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: "Email or password is not valid",
      };
    }

    case LOGOUT_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case LOGOUT_SUCCESS: {
      return { ...state, isLoading: false, userInfo: action.payload.data };
    }

    case LOGOUT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case REGISTER_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case REGISTER_SUCCESS: {
      return { ...state, isLoading: false, listUser: action.payload.data };
    }

    case REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
