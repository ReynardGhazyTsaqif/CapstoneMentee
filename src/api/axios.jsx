import axios from "axios";

const api = axios.create({
  // baseURL akan mengambil dari file .env dan menambahkan /api
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,

  // Header untuk melewati halaman peringatan ngrok
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
