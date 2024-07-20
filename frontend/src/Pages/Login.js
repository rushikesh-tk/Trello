import React from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-start pt-16 bg-gray-600">
      <h1 className="text-3xl mb-6 text-white text-center font-bold w-1/4">
        Welcome back
      </h1>
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <InputField
          label="Email"
          id="email"
          inputType="email"
          placeholder="Enter email"
        />

        <InputField
          label="Password"
          id="password"
          inputType="password"
          placeholder="Enter password"
        />

        <Button text="Login " bgColor="blue" />

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-4">
          <Button text="Login via Google" bgColor="red" />
        </div>
      </div>
    </div>
  );
};

export default Login;
