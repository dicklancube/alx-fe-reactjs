import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton';

export default function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (!recommendations.length) {
    return <p>No recommendations yet. Try adding some favorites.</p>;
  }

  return (
    <section>
      <h2>Recommended for You</h2>
      <div className="recipes">
        {recommendations.map((r) => (
          <article key={r.id} className="recipe-card">
            <h3><Link to={`/recipes/${r.id}`}>{r.title}</Link></h3>
            <p>{r.description}</p>
            <FavoriteToggleButton recipeId={r.id} />
          </article>
        ))}
      </div>
      <button onClick={generateRecommendations} style={{ marginTop: '1rem' }}>
        Refresh Recommendations
      </button>
    </section>
  );
}
