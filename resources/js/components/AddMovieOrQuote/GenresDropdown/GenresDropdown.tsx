import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import GenreChip from './GenreChip';
import { GENRES } from './genres';

type GenresDropdownProps = {
    value: string[];
    onChange: (value: string[]) => void;
    error?: string;
};

const GenresDropdown = ({ value, onChange, error }: GenresDropdownProps) => {
    const selected = value ?? [];
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const toggleGenre = (genre: string) => {
        const next = selected.includes(genre)
            ? selected.filter((g) => g !== genre)
            : [...selected, genre];
        onChange(next);
    };

    return (
        <div className="flex flex-col gap-1">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex w-full flex-wrap items-center gap-[1rem] border border-slate-gray bg-transparent py-[0.7rem] pr-[1.6rem] pl-[1.6rem] text-left text-[2rem] text-white transition-colors outline-none focus-visible:border-slate-gray focus-visible:ring-0">
                    {selected.length > 0 ? (
                        <>
                            {selected.map((genre) => (
                                <GenreChip
                                    key={genre}
                                    genre={genre}
                                    onRemove={toggleGenre}
                                />
                            ))}
                        </>
                    ) : (
                        <span>{t('select_genres')}</span>
                    )}
                    <ChevronDown className="pointer-events-none ml-auto size-[2rem]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[28rem] w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto border-slate-gray bg-charcoal-navy">
                    {GENRES.map((genre) => {
                        const isChecked = selected.includes(genre);

                        return (
                            <DropdownMenuCheckboxItem
                                key={genre}
                                checked={isChecked}
                                onSelect={() => {
                                    toggleGenre(genre);
                                    setOpen(false);
                                }}
                                className="cursor-pointer text-[1.6rem] text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                            >
                                {genre}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default GenresDropdown;
