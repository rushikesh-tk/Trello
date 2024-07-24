import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  userDataReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  createTodoReducer,
  deleteTodoReducer,
  getTodosReducer,
  updateTodoReducer,
} from "./reducers/todosReducers";

const reducer = {
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  createTodo: createTodoReducer,
  updateTodo: updateTodoReducer,
  deleteTodo: deleteTodoReducer,
  getTodo: getTodosReducer,
  userData: userDataReducer,
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
