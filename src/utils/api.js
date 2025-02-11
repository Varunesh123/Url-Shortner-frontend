import axios from "axios";

// Use environment variable for the base URL (fallback to localhost if not set)
const API_BASE_URL = "http://localhost:5000";

// Create an Axios instance with the base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Redirects the user to the Google OAuth login page.
 */
export const loginWithGoogle = async () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};

/**
 * Shortens a long URL.
 * @param {string} longUrl - The URL to shorten.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the request fails or the input is invalid.
 */
export const shortenUrl = async (longUrl, token) => {
  if (!longUrl || typeof longUrl !== "string") {
    throw new Error("Invalid URL provided.");
  }

  if (!token || typeof token !== "string") {
    throw new Error("Authentication token is required.");
  }

  try {
    const response = await api.post(
      "/api/urls",
      { longUrl },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error shortening URL:", error);
    throw new Error(error.response?.data?.message || "Failed to shorten URL.");
  }
};

/**
 * Fetches the list of URLs for the authenticated user.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the request fails or the token is invalid.
 */
export const fetchUrls = async (token) => {
  if (!token || typeof token !== "string") {
    throw new Error("Authentication token is required.");
  }

  try {
    const response = await api.get("/api/urls/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("urls fetch:", response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch URLs.");
  }
};