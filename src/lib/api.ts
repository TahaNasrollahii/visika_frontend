import axios from 'axios';

// The base URL will hit Next.js rewrites which proxy to Django
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});

api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now(),
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can handle global error logging here
    return Promise.reject(error);
  }
);

export default api;
