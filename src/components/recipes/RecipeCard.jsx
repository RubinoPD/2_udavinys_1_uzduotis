import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../services/recipeApi";

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const status = await isFavorite(user.id, recipe.id);
        setFavorite(status);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [user.id, recipe.id]);

  const handleToggleFavorite = async () => {
    setLoading(true);
    try {
      if (favorite) {
        await removeFromFavorites(favorite.id);
        setFavorite(null);
      } else {
        const newFavorite = await addToFavorites(user.id, recipe.id);
        setFavorite(newFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img
          src={
            recipe.image ||
            `https://via.placeholder.com/180x180?text=${encodeURIComponent(
              recipe.name
            )}`
          }
          alt={recipe.name}
        />
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.name}</h3>
        <p className="recipe-cuisine">{recipe.cuisine || "Various"}</p>
        <p className="recipe-description">
          {recipe.description
            ? recipe.description.substring(0, 100) + "..."
            : `${recipe.name} with ${recipe.ingredients
                ?.slice(0, 3)
                .join(", ")}...`}
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
          onClick={handleToggleFavorite}
          className={`favorite-button ${favorite ? "active" : ""}`}
          disabled={loading}
        >
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
