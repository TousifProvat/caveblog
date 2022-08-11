import Axios from 'axios';

const dev = process.env.NODE_ENV === 'development';

const axiosInstance = Axios.create({
  baseURL: dev
    ? 'http://localhost:3000/api'
    : 'https://cave-tousifprovat.vercel.app/api',
});

export default axiosInstance;
