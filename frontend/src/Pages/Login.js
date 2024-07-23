import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../actions/userActions";
import { GoogleOAuthProvider } from "@react-oauth/google";

import GoogleLogin from "../auth/GoogleLogin";

const GOOGLE_CLIENT_ID =
  "759415615889-5rhfkcqu921g4t8ufhimmhab9rfamlgr.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const handleLogin = () => {
    if (!email && !password) {
      toast.error("Please enter credentials");
      return;
    }
    if (!email) {
      toast.error("Invalid email id");
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    toast
      .promise(dispatch(login(email, password)), {
        loading: "Logging in...",
        success: "Login successful!!",
        error: error ? error : "Invalid email or password",
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error=>", err);
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pt-16 bg-gray-600">
      <h1 className="text-3xl mb-6 text-white text-center font-bold w-1/4">
        Welcome back
      </h1>

      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
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

        <Button
          text="Login"
          bgColor="blue"
          onClick={handleLogin}
          loading={loading}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-4">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
