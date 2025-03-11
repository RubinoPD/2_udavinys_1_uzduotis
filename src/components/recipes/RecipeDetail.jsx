import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getRecipeById,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../services/recipeApi";
import { useAuth } from "../../contexts/AuthContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);

        // Check if recipe is a favorite
        const favStatus = await isFavorite(user.id, parseInt(id));
        setFavorite(favStatus);
        setError(null);
      } catch (error) {
        setError("Failed to load recipe. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, user.id]);

  const handleToggleFavorite = async () => {
    setActionLoading(true);
    try {
      if (favorite) {
        await removeFromFavorites(favorite.id);
        setFavorite(null);
      } else {
        const newFavorite = await addToFavorites(user.id, parseInt(id));
        setFavorite(newFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div className="error-message">Recipe not found</div>;
  }

  return (
    <div className="recipe-detail-container">
      <Link to="/recipes" className="back-link">
        ← Back to Recipes{" "}
      </Link>
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <button
          onClick={handleToggleFavorite}
          className={`favorite-button large ${favorite ? "active" : ""}`}
          disabled={actionLoading}
        >
          {favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
      </div>

      <div className="recipe-detail-grid">
        <div className="recipe-image-container">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-detail-image"
          />
          <div className="recipe-meta-info">
            <div className="meta-item">
              <span className="meta-label">Cuisine:</span>
              <span className="meta-label">{recipe.cuisine}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Cook Time:</span>
              <span className="meta-label">{recipe.cookTimeMinutes}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Servings:</span>
              <span className="meta-label">{recipe.servings}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Calories:</span>
              <span className="meta-label">{recipe.caloriesPerServing}</span>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="recipe-section">
            <h2>Description</h2>
            <p>{recipe.description}</p>
          </div>
          <div className="recipe-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h2>Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="recipe-tags">
              <h3>Tags:</h3>
              <div className="tags-container">
                {recipe.tags.map((tag) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
