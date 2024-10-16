import { create as createStore } from 'zustand';

interface Game {
    first_release_date: number;
    id: string;
    name: string;
    summary: string;
    cover: { url: string };
    rating?: number; // Add rating property
    date: number;
}

interface StoreState {
    gamesPlayed: Game[];
    addGame: (game: Game) => void;
    removeGame: (id: string) => void; // Update removeGame to take only id
    modifyGame: (game: Game) => void;
    clearGames: () => void;
    setRating: (id: string, rating: number) => void; // Add setRating function
}

const useStore = createStore<StoreState>((set) => ({
    gamesPlayed: [],
    addGame: (game) => set((state) => {
        const exists = state.gamesPlayed.some((g) => g.id === game.id);
        if (!exists) {
            return { gamesPlayed: [...state.gamesPlayed, game] };
        }
        return state;
    }),
    removeGame: (id) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === id ? { ...g, rating: 0 } : g)).filter((g) => g.id !== id),
    })), // When removing the game, it will also remove its rating
    modifyGame: (game) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === game.id ? game : g)),
    })),
    clearGames: () => set({ gamesPlayed: [] }),
    setRating: (id, rating) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === id ? { ...g, rating } : g)),
    })),
}));

export default useStore;