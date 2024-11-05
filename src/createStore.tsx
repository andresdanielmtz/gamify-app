// src/createStore.tsx
import { create as createStore } from 'zustand';

interface Game {
  first_release_date: number;
  id: string;
  name: string;
  summary: string;
  cover: { url: string };
  rating?: number;
  date: number;
}

interface StoreState {
  gamesPlayed: Game[];
  searchTerm: string;
  pendingRatings: number;
  ratings: { [id: string]: number };
  category: number;
  platform: number;
  sortBy: string;
  page: number;
  setSearchTerm: (term: string) => void;
  setCategory: (category: number) => void;
  setPlatform: (platform: number) => void;
  setSortBy: (sortBy: string) => void;
  setPage: (page: number) => void;
  addGame: (game: Game) => void;
  removeGame: (id: string) => void;
  modifyGame: (game: Game) => void;
  clearGames: () => void;
  setRating: (id: string, rating: number) => void;
  decreasePendingRatings: () => void;
}

const useStore = createStore<StoreState>((set) => ({
  gamesPlayed: [],
  searchTerm: '',
  pendingRatings: 0,
  ratings: {},
  category: 1,
  platform: 130,
  sortBy: 'rating desc',
  page: 1,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ category }),
  setPlatform: (platform) => set({ platform }),
  setSortBy: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),
  addGame: (game) => set((state) => {
    const exists = state.gamesPlayed.some((g) => g.id === game.id);
    if (!exists) {
      return { gamesPlayed: [...state.gamesPlayed, game], pendingRatings: state.pendingRatings + 1 };
    }
    return state;
  }),
  removeGame: (id) => set((state) => {
    const newGamesPlayed = state.gamesPlayed.filter((g) => g.id !== id);
    const newRatings = { ...state.ratings };
    delete newRatings[id];
    return {
      gamesPlayed: newGamesPlayed,
      ratings: newRatings,
      pendingRatings: state.pendingRatings > 0 ? state.pendingRatings - 1 : 0,
    };
  }),
  modifyGame: (game) => set((state) => ({
    gamesPlayed: state.gamesPlayed.map((g) => (g.id === game.id ? game : g)),
  })),
  clearGames: () => set({ gamesPlayed: [] }),
  setRating: (id, rating) => set((state) => ({
    ratings: { ...state.ratings, [id]: rating },
    pendingRatings: state.pendingRatings > 0 ? state.pendingRatings - 1 : 0,
  })),
  decreasePendingRatings: () => set((state) => ({
    pendingRatings: state.pendingRatings > 0 ? state.pendingRatings - 1 : 0,
  })),
}));

export default useStore;