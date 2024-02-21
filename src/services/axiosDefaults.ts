import { sleep } from '@/utils/helpers';
import axios, { InternalAxiosRequestConfig } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

async function artificialNetworkDelay(config: InternalAxiosRequestConfig) {
  if (import.meta.env.DEV) {
    await sleep(import.meta.env.VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS);
  }
  return config;
}

axios.interceptors.request.use(artificialNetworkDelay);

export function applyBearerToken(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer: ${token}`;
}

export function clearBearerToken() {
  axios.defaults.headers.common['Authorization'] = undefined;
}

export default axios;
