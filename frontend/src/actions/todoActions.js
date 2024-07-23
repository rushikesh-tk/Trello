import axios from "axios";
import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_GET_FAIL,
  TODO_GET_REQUEST,
  TODO_GET_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
} from "../constants/todosConst";
import { API_BASE_URL } from "../constants/userConst";

export const getTodos = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: TODO_GET_REQUEST,
        });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`${API_BASE_URL}/api/todos/`, config);

        dispatch({
          type: TODO_GET_SUCCESS,
          payload: data.todos || [],
        });

        resolve(data.todos);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: TODO_GET_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};

export const addTodo = (title, description, status) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: TODO_CREATE_REQUEST,
        });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          `${API_BASE_URL}/api/todos/create`,
          { title, description, status },
          config
        );

        dispatch({
          type: TODO_CREATE_SUCCESS,
          payload: data.todos,
        });

        resolve(data.todos);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: TODO_CREATE_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};

export const updateTodo = (todoId, title, description, status) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: TODO_UPDATE_REQUEST,
        });

        const {
          userLogin: { userInfo },
        } = getState();

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.put(
          `${API_BASE_URL}/api/todos/update`,
          { todoId, title, description, status },
          config
        );

        dispatch({
          type: TODO_UPDATE_SUCCESS,
          payload: data.todos,
        });

        resolve(data.todos);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
          type: TODO_UPDATE_FAIL,
          payload: errorMessage,
        });

        reject(errorMessage);
      }
    });
  };
};

export const deleteTask = (todoId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: TODO_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `${API_BASE_URL}/api/todos/delete/${todoId}`,
        config
      );

      dispatch({
        type: TODO_DELETE_SUCCESS,
        payload: data.todos,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: TODO_DELETE_FAIL,
        payload: errorMessage,
      });
    }
  };
};
