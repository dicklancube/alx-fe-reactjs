import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

export default function EditRecipeForm({ recipeId }) {
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState(recipe?.title ?? '');
  const [description, setDescription] = useState(recipe?.description ?? '');

  if (!recipe) return null;

  function handleSubmit(e) {
    e.preventDefault();
    updateRecipe(recipeId, {
      title: title.trim(),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}
