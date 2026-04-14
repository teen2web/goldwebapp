import axios from "axios";

const STORAGE_KEY = "goldweb_tokens";
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export function getStoredTokens() {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value ? JSON.parse(value) : null;
}

export function setTokens(tokens) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens() {
  window.localStorage.removeItem(STORAGE_KEY);
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

let isRefreshing = false;
let queue = [];

function flushQueue(error, token = null) {
  queue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  queue = [];
}

api.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const tokens = getStoredTokens();
    if (!tokens?.refresh) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refresh: tokens.refresh,
      });
      const nextTokens = {
        access: data.access,
        refresh: data.refresh || tokens.refresh,
      };
      setTokens(nextTokens);
      api.defaults.headers.common.Authorization = `Bearer ${nextTokens.access}`;
      flushQueue(null, nextTokens.access);
      originalRequest.headers.Authorization = `Bearer ${nextTokens.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearTokens();
      flushQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
