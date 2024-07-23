import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { register } from "../actions/userActions";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      toast
        .promise(dispatch(register(firstName, lastName, email, password)), {
          loading: "Creating account...",
          success: "Account created successfully!!",
          error: error ? error : "Something went wrong, please try again :)",
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log("Error=>", err);
        });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pt-16 bg-gray-600">
      <h1 className="text-3xl mb-6 text-white text-center font-bold w-1/4">
        Welcome Buddy !!
      </h1>
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <InputField
          label="First Name"
          id="firstname"
          inputType="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={setFirstName}
        />

        <InputField
          label="Last Name"
          id="lastname"
          inputType="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={setLastName}
        />

        <InputField
          label="Email"
          id="email"
          inputType="email"
          placeholder="Enter email"
          value={email}
          onChange={setEmail}
        />

        <InputField
          label="Password"
          id="password"
          inputType="password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />

        <InputField
          label="Confirm Password"
          id="confirmpassword"
          inputType="password"
          placeholder="Enter password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <Button
          text={!loading ? "Create account" : "Loading..."}
          bgColor="blue"
          onClick={handleCreateAccount}
        />

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
