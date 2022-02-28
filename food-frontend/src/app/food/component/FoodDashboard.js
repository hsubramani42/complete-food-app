import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  fetchFromCart,
  removeFromCart,
} from "../../cart/action/cartAction";
import { getAllFoods, getFoodByType } from "../actions/foodAction";
import "../style/Dashboard.css";
import store from "../../../redux/store/index";
const NoFoods = () => {
  return (
    <div className="text-center">
      <h1>No Foods</h1>
      <p>
        There are no foods in the database. Please contact your administrator
      </p>
    </div>
  );
};

const FoodItem = ({ food, isAdmin, cart }) => {
  const [inCart, setInCart] = useState(
    cart.filter((item) => item.id === food.id).length > 0 ? true : false
  );
  return (
    <div className="card">
      <Link to={`/food/${food.id}`}>
        <div className="card-body">
          <h5 className="card-title">{food.foodName}</h5>
        </div>
        <div className="card-img-container">
          <img
            src={food.foodPic}
            className="card-img-top col-md-6 col-lg-6 d-inline-block col-sm-4"
            alt={food.foodName}
            height={"200px"}
          />
        </div>
      </Link>

      {!isAdmin && (
        <button
          className={`btn btn-${inCart ? "danger" : "info"}`}
          onClick={(e) => {
            if (e.target.innerText === "Add to cart") {
              store.dispatch(addToCart(food));
            } else {
              store.dispatch(removeFromCart(food.id));
            }
            setInCart(!inCart);
          }}
        >
          {inCart ? "Remove from cart" : "Add to cart"}
        </button>
      )}
    </div>
  );
};

export const FoodDashboard = ({
  food: { foods },
  getAllFoods,
  getFoodByType,
  auth: { userInfo },
  cart,
  fetchFromCart,
}) => {
  useEffect(() => {
    if (localStorage.getItem("cart")) fetchFromCart();
    if (!foods) getAllFoods();
  }, [foods, getAllFoods, fetchFromCart]);
  const isAdmin =
    userInfo && userInfo.roles && userInfo.roles.includes("ROLE_ADMIN");
  const onChange = (e) => {
    if (e.target.value === "All") {
      getAllFoods();
    } else {
      getFoodByType(e.target.value);
    }
  };

  return (
    <div className="row main" align="center">
      <div className="row mt-3">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          <form>
            <select className="form-select" onChange={onChange}>
              <option value="All">All</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
            </select>
          </form>
        </div>
      </div>

      <div className="grid-container col-md-10 mt-3">
        {foods && foods.length > 0 ? (
          foods.map((food) => (
            <FoodItem food={food} isAdmin={isAdmin} key={food.id} cart={cart} />
          ))
        ) : (
          <NoFoods />
        )}
      </div>
    </div>
  );
};

FoodDashboard.propTypes = {
  food: PropTypes.object.isRequired,
  getFoodByType: PropTypes.func.isRequired,
  getAllFoods: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  fetchFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = { getAllFoods, getFoodByType, fetchFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(FoodDashboard);
