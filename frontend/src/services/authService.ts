import axios from "axios";

export const signupUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/register', { email, password });
    return response; 
  } catch (error) {
    console.error("Signup request failed:", error);
    throw error; 
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:5000/auth/login", {
    email,
    password,
  });
  return response.data; 
};

