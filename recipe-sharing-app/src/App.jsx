import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css';

export default function App() {
  return (
    <main className="container">
      <h1>🍳 Recipe Sharing</h1>
      <AddRecipeForm />
      <hr />
      <RecipeList />
    </main>
  );
}
