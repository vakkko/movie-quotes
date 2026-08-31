export type Movie = {
    id: number;
    title: string;
    released_at: string | null;
    image_url: string;
    genre: string;
    description: string | null;
    director: string;
};

export type Quote = {
    id: number;
    quote: string;
    image_url: string;
    movie?: Movie;
    [key: string]: unknown;
};
