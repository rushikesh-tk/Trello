import React from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Signup = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-start pt-16 bg-gray-600">
      <h1 className="text-3xl mb-6 text-white text-center font-bold w-1/4">
        Welcome Buddy !!
      </h1>
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <InputField
          label="First Name"
          id="firstname"
          inputType="text"
          placeholder="Enter first name"
        />

        <InputField
          label="Last Name"
          id="lastname"
          inputType="text"
          placeholder="Enter last name"
        />

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

        <InputField
          label="Confirm Password"
          id="confirmpassword"
          inputType="password"
          placeholder="Enter password"
        />

        <Button text="Create account " bgColor="blue" />

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
