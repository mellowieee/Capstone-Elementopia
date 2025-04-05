import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

const UserService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/createUser`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllUsers`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get a user by ID
  getUser: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/getUser/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Update user by ID
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(
        `${API_URL}/updateUser?id=${id}`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Update profile by ID
  updateProfile: async (id, profileData) => {
    try {
      const response = await axios.put(
        `${API_URL}/updateProfile?id=${id}`,
        profileData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Delete a user by ID
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteUser/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Register a new user
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Login user
  loginUser: async (username, password) => {
    try {
      console.log("Sending login data:", { username, password });
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true } // Important: mohatag sa session cookies
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Logout user (Clears session)
  logoutUser: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  // Get current logged-in user (Session-Based) yessir
  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/current-user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null; // Return null if no session exists :O
    }
  },
};

export default UserService;
