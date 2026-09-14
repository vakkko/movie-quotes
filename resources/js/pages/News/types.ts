import type { User } from '@/types';

type MovieOption = {
    id: number;
    title: string;
};

type QuoteUser = {
    id: number;
    username: string;
    avatar: string;
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
