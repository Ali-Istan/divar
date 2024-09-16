import axios from "axios";
import { getCookie, setCookies } from "../utils/cookies";
import { getNewTokens } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) req.headers["Authorization"] = `bearer ${accessToken}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const oriniaRequest = error.config;
    if (error.response.status === 401 && !oriniaRequest._retry) {
      oriniaRequest._retry = true;
      const res = await getNewTokens();
      if (!res?.response) return;
      setCookies(res.response.data);
      return api(oriniaRequest);
    }
  }
);

export default api;
