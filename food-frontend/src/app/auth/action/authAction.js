import {
  GET_PROFILE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_PROFILE,
} from "../../../redux/actionsTypes";
import api from "../../../utils/api";
import { fetchFromCart } from "../../cart/action/cartAction";
import { setAlert } from "../../core/actions/alertAction";

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api().post("/register", formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("You Registered successfully", "success"));
  } catch (err) {
    const res = err.response.data;
    if (res.subErrors) {
      res.subErrors.forEach((error) =>
        dispatch(setAlert(error.field + " " + error.message, "danger"))
      );
    } else {
      dispatch(setAlert(res.message, "danger"));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const response = await api().post("/users/authenticate", formData);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getInfo = () => async (dispatch) => {
  try {
    const response = await api().get("/user/info");
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: null });
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    await api().delete(`/users/${id}`);
    dispatch(logout());
    dispatch(setAlert("Deleted profile", "danger"));
  } catch (error) {
    dispatch(setAlert(error.response.message, "danger"));
  }
};

export const updateProfie = (formData, id) => async (dispatch) => {
  try {
    const res = await api().put(`/users/${id}`, formData);
    console.log("res " + res);
    const payload = res.data;
    payload["token"] = localStorage.getItem("token");
    payload["id"] = id;
    dispatch({ type: UPDATE_PROFILE, payload: payload });
    dispatch(setAlert("updated profile", "info"));
  } catch (error) {
    dispatch(setAlert(error.response.message, "danger"));
  }
};

export const logout = () => (dispatch) => {
  //delete token from localStorage
  localStorage.clear();
  dispatch({
    type: LOGOUT,
    payload: null,
  });
  dispatch(fetchFromCart());
};
