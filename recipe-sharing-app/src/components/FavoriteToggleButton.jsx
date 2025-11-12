import { useRecipeStore } from '../store/recipeStore';

export default function FavoriteToggleButton({ recipeId }) {
  const isFav = useRecipeStore((s) => s.favorites.includes(recipeId));
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      aria-pressed={isFav}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFav ? '★ Unfavorite' : '☆ Favorite'}
    </button>
  );
}
