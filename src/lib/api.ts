import axios from 'axios';

// The base URL will hit Next.js rewrites which proxy to Django
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can handle global error logging here
    return Promise.reject(error);
  }
);

export default api;
