import axios from "axios";
import { API_BASE_URL } from "../constants/userConst";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/api/users/google?code=${code}`);
