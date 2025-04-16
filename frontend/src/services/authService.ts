import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  return axios.post("http://localhost:5000/auth/login", { email, password });
};

export const signupUser = async (email: string, password: string) => {
  return axios.post("http://localhost:5000/auth/register", { email, password });
};
