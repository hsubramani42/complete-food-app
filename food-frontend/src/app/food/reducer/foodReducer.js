import {
  ADD_FOOD,
  GET_FOODS,
  UPDATE_FOOD,
  DELETE_FOOD,
  GET_FOOD_BY_TYPE,
  GET_FOOD_DETAILS,
} from "../../../redux/actionsTypes";

const initialState = {
  foods: null,
  currentFood: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FOODS:
    case GET_FOOD_BY_TYPE:
      return {
        ...state,
        foods: payload,
      };
    case GET_FOOD_DETAILS:
    case UPDATE_FOOD:
    case DELETE_FOOD:
      //in case of delete, action sends null as payload
      return {
        ...state,
        currentFood: payload,
      };
    case ADD_FOOD:
    default:
      return state;
  }
};
