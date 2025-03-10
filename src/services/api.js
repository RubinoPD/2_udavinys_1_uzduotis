import axios from "axios";

const API_URL = "http://localhost:3001";

// For real application we need a proper password hashing on the server side

// Register a new user
export const registerUser = async (userData) => {
  try {
    // Check if email already exists
    const emailCheck = await axios.get(
      `${API_URL}/users?email=${userData.email}`
    );
    if (emailCheck.data.length > 0) {
      throw new Error("User with this email already exists");
    }

    // Check if the username already exists
    const usernameCheck = await axios.get(
      `${API_URL}/users?username=${userData.username}`
    );
    if (usernameCheck.data.length > 0) {
      throw new Error("User with this username already exists");
    }

    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Registration failed";
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    // Reiketu siaip i savo backend siusti jei rimta app daryti
    const response = await axios.get(
      `${API_URL}/users?email=${credentials.email}&password=${credentials.password}`
    );

    if (response.data.length === 0) {
      throw new Error("Invalid credentials");
    }

    // Don't return the password to the client
    const user = response.data[0];
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error.response?.data || error.message || "Login failed";
  }
};
