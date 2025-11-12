import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [
    { id: 1, title: 'Tomato Pasta', description: 'Pasta with garlic, basil & tomatoes.' },
  ],

  // CREATE
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // UPDATE
  updateRecipe: (id, updates) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  // DELETE
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // SELECTOR (handy for details page)
  getRecipeById: (id) => get().recipes.find((r) => r.id === id),
}));
