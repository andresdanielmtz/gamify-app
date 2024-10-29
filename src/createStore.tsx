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
  setSearchTerm: (term: string) => void;
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
  setSearchTerm: (term) => set({ searchTerm: term }),
  addGame: (game) => set((state) => {
    const exists = state.gamesPlayed.some((g) => g.id === game.id);
    if (!exists) {
      return { gamesPlayed: [...state.gamesPlayed, game], pendingRatings: state.pendingRatings + 1 };
    }
    return state;
  }),
  removeGame: (id) => set((state) => ({
    gamesPlayed: state.gamesPlayed.filter((g) => g.id !== id),
    pendingRatings: state.pendingRatings > 0 ? state.pendingRatings - 1 : 0,
  })),
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