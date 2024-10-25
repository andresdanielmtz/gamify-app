export interface GameCardProps {
    id: string;
    title: string;
    desc?: string;
    image: string;
    date: number;
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

