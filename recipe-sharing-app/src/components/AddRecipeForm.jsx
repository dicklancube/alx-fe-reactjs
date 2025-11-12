import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';



export default function AddRecipeForm() {
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addRecipe({ id: Date.now(), title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Recipe title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        aria-label="Recipe description"
        rows={4}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}
