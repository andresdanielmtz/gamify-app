import { create as createStore } from 'zustand';

interface Game {
    id: string;
    name: string;
    summary: string;
    cover: { url: string };
}

interface StoreState {
    gamesPlayed: Game[];
    addGame: (game: Game) => void;
    removeGame: (game: Game) => void;
    modifyGame: (game: Game) => void;
    clearGames: () => void;
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
    removeGame: (game) => set((state) => ({ gamesPlayed: state.gamesPlayed.filter((g) => g.id !== game.id) })),
    modifyGame: (game) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => (g.id === game.id ? game : g)),
    })),
    clearGames: () => set({ gamesPlayed: [] }),
}));

export default useStore;