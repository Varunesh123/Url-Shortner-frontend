import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginWithGoogle = async () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};

export const shortenUrl = async (longUrl, token) => {
  const response = await api.post(
    "/api/shorten",
    { longUrl },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const fetchUrls = async (token) => {
  const response = await api.get("/api/user/urls", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
