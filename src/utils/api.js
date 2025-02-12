import axios from "axios";

const API_BASE_URL = "https://hourserace-backend.onrender.com/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Authenticate user via MetaMask
export const login = async (walletAddress) => {
  try {
    const response = await api.post("/auth/login", { walletAddress });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error logging in";
  }
};

// Get all horses
export const getHorses = async () => {
  try {
    const response = await api.get("/horses");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching horses";
  }
};

// Get horses registered by a specific user (NEW API)
export const getUserHorses = async (token) => {
  try {
    const response = await api.get("/horses/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching user's horses";
  }
};

// Register a new horse
export const registerHorse = async (horseData, token) => {
  try {
    const response = await api.post("/horses", horseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error registering horse";
  }
};

// Approve a horse (Admin Only)
export const approveHorse = async (horseName, token) => {
  try {
    const response = await api.post(
      "/horses/approve",
      { name: horseName },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error approving horse";
  }
};

// Search for a horse by name
export const searchHorse = async (name) => {
    try {
      const response = await api.get(`/horses/search?name=${name}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Horse not found";
    }
  };
  