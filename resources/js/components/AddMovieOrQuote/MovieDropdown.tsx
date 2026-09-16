import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import DownArrow from '../svgs/DownArrow';
import VideoCamera from '../svgs/VideoCamera';

type MovieOption = {
    id: number;
    title: string;
};

type MovieDropdownProps = {
    movies: MovieOption[];
    value: MovieOption | null;
    onChange: (movie: MovieOption | null) => void;
    disabled?: boolean;
};

const MovieDropdown = ({
    movies,
    value,
    onChange,
    disabled = false,
}: MovieDropdownProps) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    disabled={disabled}
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex w-full items-center gap-[1rem] bg-black py-[1.5rem] pr-[1.6rem] pl-[1.6rem] text-left text-[2rem] text-white transition-colors outline-none focus-visible:border-slate-gray focus-visible:ring-0 data-disabled:cursor-not-allowed data-disabled:opacity-50"
                >
                    <VideoCamera />
                    <span className={'text-[2rem] text-white'}>
                        {value ? value.title : t('choose_movie')}
                    </span>
                    <DownArrow />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[28rem] w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto border-slate-gray bg-charcoal-navy">
                    {movies.map((movie) => (
                        <DropdownMenuItem
                            key={movie.id}
                            onSelect={() => {
                                onChange(movie);
                                setOpen(false);
                            }}
                            className="cursor-pointer text-[1.6rem] text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                        >
                            {movie.title}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MovieDropdown;
