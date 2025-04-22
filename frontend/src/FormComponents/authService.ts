import axios from "axios";

export const signupUser = async (email: string, password: string,userName:string) => {
  try {
    console.log(userName, 'username')
    const response = await axios.post('http://localhost:5000/auth/register', { email, password ,userName});
    console.log(response, 'restponse api')
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
  console.log(response, 'login')
  return response.data; 
};

