import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/"; // Replace with your API URL

const getAuthToken = (navigate: any) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    navigate("/login");
    throw new Error("No authentication token found. Redirecting to login...");
  }
  return token;
};

export const getRequest = async (endpoint: string, params = {}) => {
  const navigate = useNavigate();
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${getAuthToken(navigate)}` },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// utils.ts

export const postRequest = async (url: string, data: any, token?: string) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add Authorization header with Bearer token if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`http://localhost:5000/${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send request");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
