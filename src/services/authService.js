import axiosInstance from "../axiosInstance";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auths/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

export default register;
