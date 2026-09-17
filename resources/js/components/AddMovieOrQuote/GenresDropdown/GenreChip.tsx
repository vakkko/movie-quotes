import { X } from 'lucide-react';

type GenreChipProps = {
    genre: string;
    onRemove: (genre: string) => void;
};

const GenreChip = ({ genre, onRemove }: GenreChipProps) => (
    <span className="flex-items-center gap-[0.8rem] rounded-[0.6rem] bg-charcoal-navy px-[1rem] py-[0.4rem] text-[1.6rem]">
        {genre}
        <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
                e.stopPropagation();
                onRemove(genre);
            }}
            className="cursor-pointer text-silver-gray hover:text-white"
            aria-label={`Remove ${genre}`}
        >
            <X size={14} />
        </button>
    </span>
);

export default GenreChip;
