import React from "react";
import userService from "../services/UserService";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckLogIn = (props) => {
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  console.log("checkadmin");
  console.log(props);
  React.useEffect(() => {
    if (userService.isLoggedin()) {
      props.history.push("/");
    }
  }, [isLoggedInRedux]);
  return <>{props.children}</>;
};

export default withRouter(CheckLogIn);
