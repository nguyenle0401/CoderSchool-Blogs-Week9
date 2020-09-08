import * as types from "../constants/auth.constants";
import { alertActions } from "./alert.actions";
import api from "../api";

//Action include type and payload
//Middleware: receive parameters from UI -> process it -> send login action to reducer
const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });

  try {
    let response = await api.post("/auth/login", email, password);
    console.log(response.data);
    dispatch({
      type: types.LOGIN_REQUEST_SUCCESS,
      payload: response.data.data,
    });

    //After every time a user logined successfully, we need to add accessToken for later access to API
    console.log(response.data);
    api.defaults.headers.common["authorization"] =
      "Bearer " + response.data.data.accessToken;

    const name = response.data.data.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_REQUEST_FAILURE, payload: error });
  }
};

//Middleware: receive parameters from UI -> process it -> send register action to reducer
const registerRequest = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });

  try {
    let response = await api.post("/users", name, email, password);
    dispatch({
      type: types.REGISTER_REQUEST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.REGISTER_REQUEST_FAILURE, payload: error });
  }
};

//Middleware: receive parameters from UI -> process it -> send get-current-user action to reducer
const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

//Middleware: receive parameters from UI -> process it -> send logout action to reducer
const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

//login Facebook
const loginFace = (token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });

  try {
    let response = await api.get(`/auth/login/facebook/${token}`);
    dispatch({
      type: types.LOGIN_REQUEST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_REQUEST_FAILURE, payload: error });
  }
};

//login Facebook
const loginGoogle = (token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });

  try {
    let response = await api.get(`/auth/login/google/${token}`);
    dispatch({
      type: types.LOGIN_REQUEST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_REQUEST_FAILURE, payload: error });
  }
};
//Pack all actions into an object for exporting
export const authActions = {
  loginRequest,
  registerRequest,
  getCurrentUser,
  logout,
  loginFace,
  loginGoogle,
};
