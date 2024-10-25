import axios from "axios";

export const checkAuth = async () => {
  const response = await axios.get("/auth/check");
  return response.data;
};
