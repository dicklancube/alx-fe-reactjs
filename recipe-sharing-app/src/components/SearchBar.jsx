import { useEffect, useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

export default function SearchBar() {
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);
  const filterRecipes = useRecipeStore((s) => s.filterRecipes);
  const initial = useRecipeStore((s) => s.searchTerm);
  const ensure = useRecipeStore((s) => s._ensureFilteredSynced);

  const [value, setValue] = useState(initial);

  // ensure filtered list is initialized on first mount
  useEffect(() => {
    ensure();
  }, [ensure]);

  // keep filtered list updated as user types
  useEffect(() => {
    setSearchTerm(value);
    filterRecipes(); // uses latest searchTerm from previous line
  }, [value, setSearchTerm, filterRecipes]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search recipes by title, ingredient, or time…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-label="Search recipes"
    />
  );
}
