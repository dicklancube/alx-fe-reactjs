import { create } from 'zustand';

// helper used by multiple actions
const applyFilter = (recipes, term) => {
  const t = (term ?? '').toLowerCase().trim();
  if (!t) return recipes;
  return recipes.filter((r) => {
    const title = r.title?.toLowerCase() ?? '';
    const desc = r.description?.toLowerCase() ?? '';
    // optional fields (if present in your data)
    const ingredientsHit = Array.isArray(r.ingredients)
      ? r.ingredients.some((i) => i?.toLowerCase?.().includes(t))
      : false;
    const timeHit = r.time != null ? String(r.time).includes(t) : false;

    return (
      title.includes(t) ||
      desc.includes(t) ||
      ingredientsHit ||
      timeHit
    );
  });
};

export const useRecipeStore = create((set, get) => ({
  recipes: [
    { id: 1, title: 'Tomato Pasta', description: 'Pasta with garlic, basil & tomatoes.' },
  ],

  // --- search/filter state ---
  searchTerm: '',
  filteredRecipes: [],

  // initialize filteredRecipes to current recipes
  // (Vite HMR can re-run this, so compute on first read if empty)
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
    set({
      filteredRecipes: applyFilter(state.recipes, state.searchTerm),
    });
  },

  // --- CRUD ---
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      };
    }),

  updateRecipe: (id, updates) =>
    set((state) => {
      const recipes = state.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r));
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      };
    }),

  // handy selector for details page
  getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));
