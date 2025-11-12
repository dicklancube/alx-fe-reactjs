import AddRecipeForm from '../components/AddRecipeForm';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <main className="container">
      <h1>🍳 Recipe Sharing</h1>
      <SearchBar />
      <AddRecipeForm />
      <hr />
      <RecipeList />
    </main>
  );
}
