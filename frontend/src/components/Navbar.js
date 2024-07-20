import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <Link to="/" className="text-white justify-center">
        Home
      </Link>

      <Link to="/login" className="text-white float-right ml-5">
        <Button text="Login" bgColor="blue" />
      </Link>

      <Link to="/signup" className="text-white float-right ml-5 ">
        <Button text="Sign Up" bgColor="blue" />
      </Link>
    </nav>
  );
};

export default NavBar;
