import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type DatePickerProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

const FIRST_YEAR = 1900;

const toDate = (value: string): Date | undefined =>
    value ? new Date(`${value}T00:00:00`) : undefined;

const toValue = (year: number): string => `${year}-01-01`;

const DatePicker = ({ value, onChange, error }: DatePickerProps) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const date = toDate(value);
    const scrollRef = useRef<HTMLDivElement>(null);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();

        return Array.from(
            { length: currentYear - FIRST_YEAR + 1 },
            (_, i) => currentYear - i,
        );
    }, []);

    return (
        <div className="flex flex-col gap-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'relative flex w-full items-center border border-slate-gray !bg-transparent !py-[0.7rem] pr-[5rem] pl-[1.6rem] text-left !text-[2rem] text-white outline-none placeholder:text-[2rem] placeholder:text-white focus-visible:border-slate-gray focus-visible:ring-0',
                            !value && 'text-gray-500',
                        )}
                    >
                        {value ? (
                            format(date as Date, 'yyyy')
                        ) : (
                            <span className="text-gray-500">
                                {t('select_year')}
                            </span>
                        )}
                        <CalendarIcon className="pointer-events-none absolute top-[1rem] right-[2rem] size-[2rem] text-gray-500" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    ref={scrollRef}
                    onWheel={(e) => {
                        if (scrollRef.current) {
                            scrollRef.current.scrollTop += e.deltaY;
                        }
                    }}
                    className="max-h-[45vh] w-[var(--radix-popover-trigger-width)] overflow-y-auto overscroll-contain border-slate-gray bg-charcoal-navy p-[1rem]"
                    align="start"
                >
                    <div className="grid grid-cols-3 gap-[0.5rem]">
                        {years.map((year) => {
                            const isSelected = date?.getFullYear() === year;

                            return (
                                <button
                                    key={year}
                                    type="button"
                                    onClick={() => {
                                        onChange(toValue(year));
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'rounded-md px-[0.5rem] py-[0.7rem] text-[1.6rem] text-white transition-colors hover:bg-white/10',
                                        isSelected &&
                                            'bg-primary-red text-white hover:bg-primary-red',
                                    )}
                                >
                                    {year}
                                </button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default DatePicker;
