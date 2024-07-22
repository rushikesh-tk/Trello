import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConst";

export const register = (firstName, lastName, email, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/users",
          { firstName, lastName, email, password },
          config
        );

        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));

        resolve(data);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: USER_REGISTER_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/users/login",
          { email, password },
          config
        );

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));

        resolve(data);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: USER_LOGIN_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      localStorage.removeItem("userInfo");
      dispatch({ type: USER_LOGOUT });
      resolve();
    });
  };
};
