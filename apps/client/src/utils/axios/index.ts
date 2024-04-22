import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://hyva-server.onrender.com';
export const apiClient = axios.create({
    baseURL: BASE_URL
});