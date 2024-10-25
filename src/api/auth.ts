import axios from "axios";

export const checkAuth = async () => {
  const response = await axios.get("/auth/check");
  return response.data;
};

export const registerAuth = async (username: string, password: string) => {
  const response = await axios.post(
    "/auth/register",
    { username: username, password: password },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginAuth = async (username: string, password: string) => {
  const response = await axios.post(
    "/auth/login",
    { username: username, password: password },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getUsername = async () => {
  const response = await axios.get("/auth/get_username");
  if (response.status !== 200) {
    throw new Error("Failed to fetch username");
  }
  return response.data;
};
