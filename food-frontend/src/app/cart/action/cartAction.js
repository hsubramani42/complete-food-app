import {
  ADD_TO_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
} from "../../../redux/actionsTypes";
import { setAlert } from "../../core/actions/alertAction";
export const addToCart = (food) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: food });
  dispatch(setAlert("Added to cart successfully!", "success"));
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
  dispatch(setAlert("Removed from cart successfully!", "info"));
};

export const fetchFromCart = (id) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  dispatch({ type: FETCH_CART, payload: cart ? cart : [] });
};
