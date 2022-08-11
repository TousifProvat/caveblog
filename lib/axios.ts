import Axios from 'axios';

const dev = process.env.NODE_ENV === 'production';

const axiosInstance = Axios.create({
  baseURL: dev
    ? 'http://localhost:3000/api'
    : 'https://cave-gules.vercel.app/api',
});

export default axiosInstance;
