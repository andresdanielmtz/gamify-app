import axiosInstance from '../config/axiosConfig';
import { AxiosError } from 'axios';

export class AuthError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}

export const checkAuth = async () => {
  const response = await axiosInstance.get("/auth/check");
  return response.data;
};

export const registerAuth = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.error || 'Registration failed';
      
      switch (status) {
        case 403:
          throw new AuthError('Email domain not authorized', status);
        case 409:
          throw new AuthError('Email already registered', status);
        case 400:
          throw new AuthError(errorMessage, status);
        default:
          throw new AuthError('Registration failed', status);
      }
    }
    throw new AuthError('Network error', 500);
  }
};


export const loginAuth = async (email: string, password: string) => {
  const response = await axiosInstance.post(
    "/auth/login",
    { email, password },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const logoutAuth = async () => {
  const response = await axiosInstance.post(
    "/auth/logout",
    {},
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
  const response = await axiosInstance.get("/auth/get_username");
  if (response.status !== 200) {
    throw new Error("Failed to fetch username");
  }
  return response.data;
};