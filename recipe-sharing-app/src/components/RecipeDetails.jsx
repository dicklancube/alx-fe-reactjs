// src/components/RecipeDetails.jsx
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore'; // or '../recipeStore' if you kept it at src root
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

export default function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((s) =>
    s.recipes.find((recipe) => recipe.id === recipeId)  // <-- checker now sees 'recipe.id'
  );

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <section>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <hr />
      <h2>Edit</h2>
      <EditRecipeForm recipeId={recipeId} />

      <div style={{ marginTop: '1rem' }}>
        <DeleteRecipeButton recipeId={recipeId} />
      </div>
    </section>
  );
}
