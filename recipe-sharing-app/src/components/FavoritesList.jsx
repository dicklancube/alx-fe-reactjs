import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton';

export default function FavoritesList() {
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes   = useRecipeStore((s) => s.recipes);

  const favRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  if (!favRecipes.length) return <p>You haven’t favorited any recipes yet.</p>;

  return (
    <section>
      <h2>My Favorites</h2>
      <div className="recipes">
        {favRecipes.map((r) => (
          <article key={r.id} className="recipe-card">
            <h3><Link to={`/recipes/${r.id}`}>{r.title}</Link></h3>
            <p>{r.description}</p>
            <FavoriteToggleButton recipeId={r.id} />
          </article>
        ))}
      </div>
    </section>
  );
}
