import { useRecipeStore } from './recipeStore';

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes);

  if (recipes.length === 0) return <p>No recipes yet. Add one!</p>;

  return (
    <div className="recipes">
      {recipes.map((r) => (
        <article key={r.id} className="recipe-card">
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </article>
      ))}
    </div>
  );
}
