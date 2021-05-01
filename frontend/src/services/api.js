import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function handleResponse(response) {
    return response;
  },
  function handleError(error) {
    if (error && error.response) {
      if (error.response.status == 401) {
        toast.error("HTTP 401: Sem permisão de acesso.");
      } else {
        toast.error(error.response.data.Message);
      }
    } else {
      toast.error(`${error}`);
    }
    return Promise.reject(error);
  }
);

export default api;
