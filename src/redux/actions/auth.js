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

import authAPI from "src/services/authAPI";

export function login(values) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await authAPI.login(values);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: LOGIN_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error.response },
      });
    }
  };
}

export function register(values) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const { data } = await authAPI.login(values);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: REGISTER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { error: error.response },
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      const { data } = await authAPI.logout();
      localStorage.removeItem("userInfo");
      dispatch({ type: LOGOUT_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: { error: "" },
      });
    }
  };
}
