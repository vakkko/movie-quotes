import type { User } from '@/types';

export type MovieOption = {
    id: number;
    title: string;
};

type QuoteUser = {
    id: number;
    username: string;
    avatar_url: string;
};

type QuoteMovie = {
    id: number;
    title: string;
    director: string;
    released_at: string;
};

export type QuoteComment = {
    id: number;
    body: string;
    created_at: string;
    user: QuoteUser;
};

export type Quote = {
    id: number;
    quote?: string;
    quote_en?: string;
    quote_ka?: string;
    image_url: string;
    created_at: string;
    user: QuoteUser;
    movie: QuoteMovie;
    comments: QuoteComment[];
    likes_count: number;
    comments_count: number;
    is_liked: boolean;
};

export type NewsProps = {
    quotes: {
        data: Quote[];
    };
    movies: MovieOption[];
    user: User;
};

export type QuoteReactionChanged = {
    quote_id: number;
    likes_count: number;
};

export type QuoteReactionToggled = {
    is_liked: boolean;
    likes_count: number;
};

export type QuoteCommentCreated = {
    quote_id: number;
    comment: QuoteComment;
};

export type QuoteCreated = {
    quote: {
        id: number;
        quote_en: string;
        quote_ka: string;
        image_url: string;
        created_at: string;
        user: QuoteUser;
        movie: {
            id: number;
            title_en: string;
            title_ka: string;
            director_en: string;
            director_ka: string;
            released_at: string;
        };
        comments: QuoteComment[];
        likes_count: number;
        comments_count: number;
        is_liked: boolean;
    };
};

export type MovieCreated = {
    movie: {
        id: number;
        title: string;
        released_at: number;
        image_url: string;
        genres: string[];
        description: string | null;
        director: string;
        quotes_count: number;
    };
};
