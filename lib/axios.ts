import { signOut } from 'next-auth/react';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
});

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('transport-token');
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     throw error;
//   }
// );

export default axios;
