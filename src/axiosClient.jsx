import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('current_user_token')}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      return Promise.reject(err);
    }
  }
);

export default axiosClient;