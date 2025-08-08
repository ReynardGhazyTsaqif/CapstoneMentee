import axios from "axios";

// Langsung buat dan ekspor instance-nya, bukan fungsinya
const api = axios.create({
  // URL dasar dari API Anda
  baseURL: "https://cec458ecaa22.ngrok-free.app/api",

  // Header untuk melewati halaman peringatan ngrok
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
