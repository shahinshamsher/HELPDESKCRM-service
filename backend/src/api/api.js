import axios from 'axios';

// Shared API client used in browser contexts. Do not rely on .env files here;
// set BACKEND_BASE_URL below when deploying if needed.
const BACKEND_BASE_URL = ''; // e.g. 'https://my-backend.onrender.com'

const base = BACKEND_BASE_URL ? `${BACKEND_BASE_URL}/api` : 'http://localhost:5000/api';

const API = axios.create({ baseURL: base });

console.log('API Base URL:', API.defaults.baseURL);

// attach token (guard for non-browser environments)
API.interceptors.request.use((config) => {
  try {
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {}
  return config;
});

export default API;
