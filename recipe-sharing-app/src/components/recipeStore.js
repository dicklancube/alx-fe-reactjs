import { create } from 'zustand';

// Simple scorer for recommendations based on overlap with favorite recipes
const applyFilter = (recipes, term) => {
  const t = (term ?? '').toLowerCase().trim();
  if (!t) return recipes;
  return recipes.filter((r) => {
    const title = r.title?.toLowerCase() ?? '';
    const desc  = r.description?.toLowerCase() ?? '';
    const ingredientsHit = Array.isArray(r.ingredients)
      ? r.ingredients.some((i) => i?.toLowerCase?.().includes(t))
      : false;
    const timeHit = r.time != null ? String(r.time).includes(t) : false;
    return title.includes(t) || desc.includes(t) || ingredientsHit || timeHit;
  });
};

const computeRecommendations = (recipes, favorites) => {
  const favs = recipes.filter((r) => favorites.includes(r.id));
  if (favs.length === 0) return [];
  const terms = new Set();
  favs.forEach((r) => {
    (`${r.title} ${r.description}`.toLowerCase().match(/\b[a-z]{3,}\b/g) || [])
      .forEach((w) => terms.add(w));
    if (Array.isArray(r.ingredients)) {
      r.ingredients.forEach((i) => terms.add(String(i).toLowerCase()));
    }
  });

  return recipes
    .filter((r) => !favorites.includes(r.id))
    .map((r) => {
      let score = 0;
      const text = `${r.title} ${r.description}`.toLowerCase();
      terms.forEach((t) => {
        if (text.includes(t)) score += 1;
      });
      if (Array.isArray(r.ingredients)) {
        r.ingredients.forEach((i) => {
          if (terms.has(String(i).toLowerCase())) score += 2;
        });
      }
      return { recipe: r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.recipe);
};

export const useRecipeStore = create((set, get) => ({
  // --- data ---
  recipes: [
    { id: 1, title: 'Tomato Pasta', description: 'Pasta with garlic, basil & tomatoes.' },
  ],

  // --- search/filter state (from previous task) ---
  searchTerm: '',
  filteredRecipes: [],
  _ensureFilteredSynced: () => {
    const state = get();
    if (!state.filteredRecipes.length && state.recipes.length) {
      set({ filteredRecipes: applyFilter(state.recipes, state.searchTerm) });
    }
  },
  setSearchTerm: (term) => {
    const recipes = get().recipes;
    set({
      searchTerm: term,
      filteredRecipes: applyFilter(recipes, term),
    });
  },
  filterRecipes: () => {
    const state = get();
    set({ filteredRecipes: applyFilter(state.recipes, state.searchTerm) });
  },

  // --- favorites ---
  favorites: [],                 // stores recipe ids
  addFavorite: (id) =>
    set((s) => {
      if (s.favorites.includes(id)) return {};
      const favorites = [...s.favorites, id];
      return { favorites, recommendations: computeRecommendations(s.recipes, favorites) };
    }),
  removeFavorite: (id) =>
    set((s) => {
      const favorites = s.favorites.filter((x) => x !== id);
      return { favorites, recommendations: computeRecommendations(s.recipes, favorites) };
    }),
  toggleFavorite: (id) =>
    set((s) => {
      const exists = s.favorites.includes(id);
      const favorites = exists ? s.favorites.filter((x) => x !== id) : [...s.favorites, id];
      return { favorites, recommendations: computeRecommendations(s.recipes, favorites) };
    }),
  isFavorite: (id) => get().favorites.includes(id),

  // --- recommendations ---
  recommendations: [],
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    set({ recommendations: computeRecommendations(recipes, favorites) });
  },

  // --- CRUD (keep filtered + recs in sync) ---
  addRecipe: (newRecipe) =>
    set((s) => {
      const recipes = [...s.recipes, newRecipe];
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, s.searchTerm),
        recommendations: computeRecommendations(recipes, s.favorites),
      };
    }),

  updateRecipe: (id, updates) =>
    set((s) => {
      const recipes = s.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r));
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, s.searchTerm),
        recommendations: computeRecommendations(recipes, s.favorites),
      };
    }),

  deleteRecipe: (id) =>
    set((s) => {
      const recipes = s.recipes.filter((r) => r.id !== id);
      const favorites = s.favorites.filter((x) => x !== id);
      return {
        recipes,
        favorites,
        filteredRecipes: applyFilter(recipes, s.searchTerm),
        recommendations: computeRecommendations(recipes, favorites),
      };
    }),

  // selector
  getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));
