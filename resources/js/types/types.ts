export type Movie = {
    id: number;
    title: string;
    released_at: number;
    image_url: string;
    genres: string[];
    description: string | null;
    director: string;
};

export type MovieDetail = Movie & {
    quotes_count: number;
    quotes: MovieQuote[];
    title_en: string;
    title_ka: string;
    director_en: string;
    director_ka: string;
    description_en: string;
    description_ka: string;
    release_date: string;
};

export type MovieShowResponse = {
    data: MovieDetail;
};

export type MovieQuote = {
    id: number;
    quote: string;
    image_url: string;
    user: {
        id: number;
        username: string;
        avatar: string | null;
    };
    likes_count: number;
    comments_count: number;
    is_liked: boolean;
    comments: QuoteComment[];
};

export type QuoteComment = {
    id: number;
    body: string;
    created_at: string;
    user: {
        id: number;
        username: string;
        avatar: string | null;
    };
};

export type Quote = {
    id: number;
    quote: string;
    image_url: string;
    movie?: Movie;
    [key: string]: unknown;
};

export type User = {
    id: number;
    email: string;
    username: string;
    avatar_url: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};
