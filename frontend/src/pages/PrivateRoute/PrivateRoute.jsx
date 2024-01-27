import { Outlet, Navigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((store) => store.auth);

  return userInfo ? (
    <>
      <NavigationBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
