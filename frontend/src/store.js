import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = {
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
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
