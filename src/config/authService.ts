import { AxiosError } from 'axios';
import axiosInstance from '../config/axiosConfig';

export class AuthError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}
