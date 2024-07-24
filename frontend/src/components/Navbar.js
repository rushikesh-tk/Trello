import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { GoGoal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../actions/userActions";
import toast from "react-hot-toast";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const isUserLoggedIn = userLogin?.userInfo;

  const userData = useSelector((state) => state.userData);

  console.log("userData======", userData, isUserLoggedIn);
  const { userInfo, loading } = userData;

  useEffect(() => {
    if (isUserLoggedIn?.token) {
      dispatch(getUserData());
    }
  }, []);

  const handleLogout = () => {
    toast
      .promise(dispatch(logout()), {
        loading: "Logging out...",
        success: "Logout successful!!",
        error: "Something went wrong, please try again :)",
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error=>", err);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <Link to="/" className="text-white">
        <GoGoal size={30} />
      </Link>

      <div className="ml-auto flex space-x-5">
        {isUserLoggedIn?.token ? (
          <>
            {loading ? (
              <></>
            ) : (
              <div className="flex justify-center items-center ">
                {userInfo?.userInfo && userInfo?.userInfo?.firstName && (
                  <div className="text-white font-bold text-lg ">
                    Hi, {userInfo?.userInfo?.firstName}
                  </div>
                )}
                {userInfo?.userInfo && userInfo?.userInfo?.picture && (
                  <img
                    src={userInfo?.userInfo?.picture}
                    className="h-10 border border-white rounded-full ml-4"
                  />
                )}
              </div>
            )}

            <div className="text-white">
              <button
                type="button"
                className={`w-full flex items-center justify-center font-semibold bg-red-500 text-white p-2 rounded-md hover:bg-red-600`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white">
              <Button text="Login" bgColor="blue" />
            </Link>

            <Link to="/signup" className="text-white">
              <Button text="Sign Up" bgColor="blue" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
