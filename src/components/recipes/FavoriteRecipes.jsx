import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getFavorites,
  getRecipeById,
  removeFromFavorites,
} from "../../services/recipeApi";

const FavoriteRecipes = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoritesData = await getFavorites(user.id);
        setFavorites(favoritesData);

        // Fetch details for each favorite recipe
        const recipePromises = favoritesData.map((fav) =>
          getRecipeById(fav.recipeId).catch((error) => {
            console.error(`Failed to fetch recipe ${fav.recipeId}:`, error);
            return null;
          })
        );
        const recipeResults = await Promise.all(recipePromises);

        // Filter out any null results (failed fetches)
        const validRecipes = recipeResults.filter((recipe) => recipe !== null);

        // Map each recipe with its favorite ID for easy removal
        const recipesWithFavId = validRecipes.map((recipe) => {
          const favorite = favoritesData.find(
            (fav) => fav.recipeId === recipe.id
          );
          return {
            ...recipe,
            favoriteId: favorite ? favorite.id : null,
          };
        });

        setRecipes(recipesWithFavId);
        setError(null);
      } catch (error) {
        setError("Failed to load favorite recipes. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  }, [user.id]);

  const handleRemoveFavorite = async (favoriteId, recipeId) => {
    try {
      await removeFromFavorites(favoriteId);

      // Update local state to remove the recipe
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading favorite recipes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorite Recipes</h2>

      {recipes.length === 0 ? (
        <div className="no-favorites">
          <p>You don't have any favorite recipes yet.</p>
          <Link to="/recipes" className="cta-button primary">
            Discover Recipes
          </Link>
        </div>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-image">
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="recipe-card-content">
                <h3>{recipe.name}</h3>
                <p className="recipe-cuisin">{recipe.cuisine}</p>
                <p className="recipe-description">
                  {recipe.description.substring(0, 100)}...
                </p>
                <div className="recipe-meta">
                  <span>⏱️ {recipe.cookTimeMinutes} min</span>
                  <span>🍽️ {recipe.servings} servings</span>
                </div>
              </div>
              <div className="recipe-card-actions">
                <Link to={`/recipe/${recipe.id}`} className="view-button">
                  View Recipe
                </Link>
                <button
                  onClick={() =>
                    handleRemoveFavorite(recipe.favoriteId, recipe.id)
                  }
                  className="remove-favorite-button"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
