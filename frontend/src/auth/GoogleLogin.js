/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, googleLoginAction } from "../actions/userActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        console.log("auth code===", authResult.code);
        const result = await googleAuth(authResult.code);

        let tempUser = {};

        tempUser = {
          message: result?.data?.message,
          token: result?.data?.token,
        };

        toast
          .promise(dispatch(googleLoginAction(tempUser)), {
            loading: "Logging in...",
            success: "Google Login successful!!",
            error: error ? error : "Something went wrong, Please try again!!",
          })
          .then(() => {
            navigate("/");
            dispatch(getUserData());
          })
          .catch((err) => {
            console.log("Error=>", err);
          });
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Google error=>", e.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      text="Login via Google"
      bgColor="blue"
      onClick={googleLogin}
      // loading={loading}
    />
  );
};
