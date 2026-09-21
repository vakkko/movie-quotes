import EditDeleteActions from '@/components/EditDeleteActions';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import type { Movie, MovieShowResponse } from '@/types';

type MovieBase = Pick<
    Movie,
    'id' | 'title' | 'released_at' | 'image_url' | 'genres' | 'director'
>;

type MovieDetailsProps = {
    data: MovieShowResponse['data'] | MovieBase;
    showModal?: 'edit' | null;
    onShowModalChange?: (showModal: 'edit' | null) => void;
    onDeleteMovie?: () => void;
    isDeleting?: boolean;
    addQuoteFromMoviePage?: boolean;
};

const MovieDetails = ({
    data,
    showModal,
    onShowModalChange,
    onDeleteMovie,
    isDeleting,
    addQuoteFromMoviePage,
}: MovieDetailsProps) => {
    const { t } = useTranslation();

    const handleModalClose = () => {
        if (onShowModalChange) {
            onShowModalChange(null);
        }
    };

    const handleEditClick = () => {
        if (onShowModalChange) {
            onShowModalChange('edit');
        }
    };

    return (
        <div className="mt-[3.3rem] flex gap-[2rem] max-[1520px]:flex-col">
            <div className="h-[44rem] w-[80rem] overflow-hidden max-[1520px]:h-full max-[1520px]:w-full">
                <img
                    className={cn('aspect-auto w-full rounded-[1.2rem]')}
                    src={data.image_url}
                    alt={data.title}
                />
            </div>
            <div className="flex-column gap-[2rem] max-[1520px]:w-full">
                <div className="flex items-start justify-between">
                    <h3 className="font-500-size-24 leading-[150%] text-cream">
                        {data.title} ({data.released_at})
                    </h3>
                    {!addQuoteFromMoviePage && (
                        <EditDeleteActions
                            showModal={showModal}
                            handleCancel={handleModalClose}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={onDeleteMovie}
                            isDeleting={isDeleting}
                        />
                    )}
                </div>
                <div className="flex gap-[0.8rem]">
                    {data.genres.map((genre) => (
                        <span
                            key={genre}
                            className="rounded-[0.4rem] bg-slate-gray px-[1.1rem] py-[0.6rem] text-center font-700-size-18"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
                <div>
                    <span className="font-700-size-18 text-silver-gray">
                        {t('director')}:
                    </span>
                    <span className="font-500-size-16">{data.director}</span>
                </div>
                {!addQuoteFromMoviePage && <p>{(data as Movie).description}</p>}
            </div>
        </div>
    );
};

export default MovieDetails;
