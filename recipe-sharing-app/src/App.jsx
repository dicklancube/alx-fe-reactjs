import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './components/RecipeDetails';

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem' }}>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

