import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://emaildetailerbackend-1.onrender.com";

export async function getTestInfo() {
  return axios.get(`${API_BASE}/test-info`).then((r) => r.data);
}

export async function getEmails(limit = 20) {
  return axios.get(`${API_BASE}/api/emails?limit=${limit}`).then((r) => r.data);
}

export async function getStats() {
  return axios.get(`${API_BASE}/api/stats`).then((r) => r.data);
}
