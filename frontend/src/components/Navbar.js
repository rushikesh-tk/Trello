import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { GoGoal } from "react-icons/go";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <Link to="/" className="text-white">
        <GoGoal size={30} />
      </Link>

      <div className="ml-auto flex space-x-5">
        <Link to="/login" className="text-white">
          <Button text="Login" bgColor="blue" />
        </Link>

        <Link to="/signup" className="text-white">
          <Button text="Sign Up" bgColor="blue" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
