import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { GoGoal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import toast from "react-hot-toast";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    toast
      .promise(dispatch(logout()), {
        loading: "Logging out...",
        success: "Logout successful!!",
        error: "Network error",
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
        {userInfo ? (
          <div className="text-white">
            <button
              type="button"
              className={`w-full flex items-center justify-center font-semibold bg-red-500 text-white p-2 rounded-md hover:bg-red-600`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
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
