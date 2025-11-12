import AddRecipeForm from '../components/AddRecipeForm';
import RecipeList from '../components/RecipeList';

export default function Home() {
  return (
    <main className="container">
      <h1>🍳 Recipe Sharing</h1>
      <AddRecipeForm />
      <hr />
      <RecipeList />
    </main>
  );
}
