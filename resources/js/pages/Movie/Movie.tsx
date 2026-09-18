import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import type { MovieShowResponse } from '@/types';
import AddMovie from '../../components/AddMovieOrQuote/AddMovie/AddMovie';
import MovieDetails from './components/MovieDetails';
import QuoteCard from './components/QuoteCard';
import QuoteDropdown from './components/QuoteDropdown';
import QuoteSectionHeading from './components/QuoteSectionHeading';
import useMovie from './useMovie';

type MovieProps = {
    movie: MovieShowResponse;
};

const Movie = ({ movie }: MovieProps) => {
    const { data } = movie;
    const { t } = useTranslation();
    const {
        user,
        showModal,
        isDeleting,
        deleteTarget,
        deleteMessage,
        handleConfirmDelete,
        handleDeleteMovie,
        handleDeleteQuote,
        handleCancelDelete,
        handleShowModalChange,
    } = useMovie({ movieId: data.id });

    return (
        <div className="flex-column w-full">
            <h2 className="font-500-size-24">{t('movie_description')}</h2>
            <MovieDetails
                data={data}
                showModal={showModal}
                onShowModalChange={handleShowModalChange}
                onDeleteMovie={handleDeleteMovie}
                isDeleting={isDeleting}
            />
            <QuoteSectionHeading
                quotesCount={data.quotes_count}
                movie={{
                    id: data.id,
                    image_url: data.image_url,
                    title: data.title,
                    released_at: data.released_at,
                    genres: data.genres,
                    director: data.director,
                }}
            />
            <div className="flex-column gap-[4rem] rounded-[1rem]">
                {data.quotes.map((quote) => {
                    const isOwner = quote.user.id === user?.id;

                    return (
                        <div
                            key={quote.id}
                            className="relative w-[60%] bg-deep-navy px-[3.2rem] py-[2.4rem] max-lg:w-full"
                        >
                            {isOwner && (
                                <QuoteDropdown
                                    quote={quote}
                                    onDelete={handleDeleteQuote}
                                />
                            )}
                            <QuoteCard quote={quote} />
                        </div>
                    );
                })}
            </div>
            {showModal === 'edit' && (
                <AddMovie
                    open
                    onOpenChange={(open) =>
                        !open && handleShowModalChange(null)
                    }
                    movie={movie}
                />
            )}
            <ConfirmDeleteDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => !open && handleCancelDelete()}
                message={deleteMessage}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

Movie.layout = (page: React.ReactNode) => (
    <DefaultLayout className="ml-[1.6rem]">{page}</DefaultLayout>
);

export default Movie;
