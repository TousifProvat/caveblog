import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: `http://localhost:3000/api`,
});

export default axiosInstance;
