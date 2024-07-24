import axios from "axios";
import {
  API_BASE_URL,
  USER_DATA_FAIL,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConst";

console.log("apibase=", API_BASE_URL);

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
          `${API_BASE_URL}/api/users`,
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
          `${API_BASE_URL}/api/users/login`,
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

export const googleLoginAction = (userData) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: USER_LOGIN_REQUEST });

        if (userData) {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: userData });

          localStorage.setItem("userInfo", JSON.stringify(userData));

          resolve(userData);
        }
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

export const getUserData = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: USER_DATA_REQUEST });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `${API_BASE_URL}/api/users/userdata`,
          config
        );

        dispatch({
          type: USER_DATA_SUCCESS,
          payload: data,
        });

        resolve(data);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: USER_DATA_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};
