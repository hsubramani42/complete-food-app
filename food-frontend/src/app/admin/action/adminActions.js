import { DELETE_CUSTOMER, GET_CUSTOMERS } from "../../../redux/actionsTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const res = await api().delete(`/users/${id}`);
    dispatch({ type: DELETE_CUSTOMER, payload: res.data });
    dispatch(setAlert("Deleted customer", "danger"));
    dispatch(getCustomers());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

export const getCustomers = () => async (dispatch) => {
  try {
    const res = await api().get(`/users`);
    dispatch({ type: GET_CUSTOMERS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};
