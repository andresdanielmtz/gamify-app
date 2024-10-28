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
    searchTerm: string; // Add searchTerm property
    setSearchTerm: (term: string) => void; // Add setSearchTerm function
    addGame: (game: Game) => void;
    removeGame: (id: string) => void;
    modifyGame: (game: Game) => void;
    clearGames: () => void;
    setRating: (id: string, rating: number) => void;
}

const useStore = createStore<StoreState>((set) => ({
    gamesPlayed: [],
    searchTerm: '', 
    setSearchTerm: (term) => set({ searchTerm: term }), // Set the searchTerm
    addGame: (game) => set((state) => {
        const exists = state.gamesPlayed.some((g) => g.id === game.id);
        if (!exists) {
            return { gamesPlayed: [...state.gamesPlayed, game] };
        }
        return state;
    }),
    removeGame: (id) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === id ? { ...g, rating: 0 } : g)).filter((g) => g.id !== id),
    })),
    modifyGame: (game) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === game.id ? game : g)),
    })),
    clearGames: () => set({ gamesPlayed: [] }),
    setRating: (id, rating) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === id ? { ...g, rating } : g)),
    })),
}));

export default useStore;
