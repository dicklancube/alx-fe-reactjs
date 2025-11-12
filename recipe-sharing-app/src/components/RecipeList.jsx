import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes);
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  if (!recipes.length) return <p>No recipes yet. Add one!</p>;

  return (
    <div className="recipes">
      {recipes.map((r) => (
        <article key={r.id} className="recipe-card">
          <h3>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </h3>
          <p>{r.description}</p>
          <button onClick={() => deleteRecipe(r.id)}>Delete</button>
        </article>
      ))}
    </div>
  );
}
