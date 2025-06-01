import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://localhost:1234/api/v1",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}); 