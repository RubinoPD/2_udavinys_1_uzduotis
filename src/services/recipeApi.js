import axios from "axios";

const API_URL = "http://localhost:3001";
const DUMMY_JSON_API = "https://dummyjson.com/recipes";

// Get all recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(DUMMY_JSON_API);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to fetch recipes";
  }
};

// Get single recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${DUMMY_JSON_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to fetch recipe";
  }
};

// Get users's favorite recipes
export const getFavorites = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/favorites?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to fetch favorites";
  }
};

// Add recipe to favorites
export const addToFavorites = async (userId, recipeId) => {
  try {
    // Check if recipe is already in favorites
    const existingFav = await axios.get(
      `${API_URL}/favorites?userId=${userId}&recipeID=${recipeId}`
    );

    if (existingFav.data.length > 0) {
      return existingFav.data[0]; // Already exists
    }

    // Add to favorites
    const response = await axios.post(`${API_URL}/favorites`, {
      userId,
      recipeId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to add to favorites";
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (favoriteId) => {
  try {
    await axios.get(`${API_URL}/favorites/${favoriteId}`);
    return true;
  } catch (error) {
    throw (
      error.response?.data || error.message || "Failed to remove from favorites"
    );
  }
};

// Check if a a recipe is in favorites
export const isFavorite = async (userId, recipeId) => {
  try {
    const response = await axios.get(
      `${API_URL}/favorites?userId=${userId}&recipeId=${recipeId}`
    );
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    throw (
      error.response?.data ||
      error.message ||
      "Failed to check favorites status"
    );
  }
};
