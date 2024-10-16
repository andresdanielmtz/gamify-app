import { create } from "zustand";

interface Game {
    id: string;
    name: string;
    rating: number;
}

interface StoreState {
    gamesPlayed: Game[];
    addGame: (game: Game) => void;
    removeGame: (game: Game) => void;
    modifyGame: (game: Game) => void;
    clearGames: () => void;
}

export default create<StoreState>((set) => ({
    gamesPlayed: [],
    addGame: (game) => set((state) => ({ gamesPlayed: [...state.gamesPlayed, game] })),
    removeGame: (game) => set((state) => ({ gamesPlayed: state.gamesPlayed.filter((g) => g.id !== game.id) })),
    modifyGame: (game) => set((state) => ({
        gamesPlayed: state.gamesPlayed.map((g) => {
            if (g.id === game.id) {
                return game;
            }
            return g;
        }),
    })),
    clearGames: () => set({ gamesPlayed: [] }),

}));