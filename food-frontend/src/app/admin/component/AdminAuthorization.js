import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAlert } from "../../core/actions/alertAction";

export const AdminAuthorization = ({
  auth: { userInfo, isAuthenticated, isLoading },
  Component,
  setAlert,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isUser =
      userInfo && userInfo.roles && userInfo.roles.includes("ROLE_USER")
        ? true
        : false;
    //wait for loading to complete
    if (!isAuthenticated) {
      setAlert("Login as admin to access the page!", "danger");
      navigate("/auth/login");
    } else if (isUser) {
      setAlert("Customers cannot access this page, Login as user!", "danger");
      navigate("/food");
    }
  }, [isAuthenticated, isLoading, navigate, setAlert, userInfo]);
  if (isAuthenticated) return <Component />;
  return <Navigate to="/food"></Navigate>;
};

AdminAuthorization.propTypes = {
  auth: PropTypes.object.isRequired,
  Component: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(AdminAuthorization);
