export interface GameCardProps {
    id: string;
    title: string;
    desc?: string;
    image: string;
    date: number;
}

export interface Game {
    id: string;
    name: string;
    summary: string;
    first_release_date: number;
    cover?: { url: string };
  }

export interface GameAPIResponse {
    id: string;
    name?: string;
    title?: string;
    summary?: string;
    desc?: string;
    cover?: {
        url: string;
    };
    image?: string;
    first_release_date?: number;
    date?: number;
}

export interface ProfileGameCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    rating?: number;
    date: number;
  }

export interface NormalizedGameDetails {
    id: string;
    name: string;
    summary: string;
    cover: {
        url: string;
    };
    first_release_date: number;
    date: number;
}


export interface GameFilterParams {
    category?: number;
    platforms?: number;
    sort_by?: string;
    limit?: number;
    page?: number;
  }

