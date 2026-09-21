import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

const toDate = (value: string): Date | undefined =>
    value ? new Date(`${value}T00:00:00`) : undefined;

const toValue = (date: Date | undefined): string =>
    date ? format(date, 'yyyy-MM-dd') : '';

const DatePicker = ({ value, onChange, error }: DatePickerProps) => {
    const [open, setOpen] = useState(false);
    const date = toDate(value);

    return (
        <div className="flex flex-col gap-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'text:leading-[150%] relative flex w-full items-center border border-slate-gray !bg-transparent !py-[0.7rem] pr-[5rem] pl-[1.6rem] text-left !text-[2rem] text-white outline-none placeholder:text-[2rem] placeholder:text-white focus-visible:border-slate-gray focus-visible:ring-0',
                            !value && 'text-white',
                        )}
                    >
                        {value ? (
                            format(date as Date, 'PPP')
                        ) : (
                            <span className="text-gray-500">Select date</span>
                        )}
                        <CalendarIcon className="pointer-events-none absolute top-[1rem] right-[2rem] size-[2rem] text-gray-500" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto border-slate-gray bg-charcoal-navy p-0"
                    align="start"
                    style={
                        {
                            '--primary': 'var(--color-primary-red)',
                            '--primary-foreground': '#ffffff',
                        } as CSSProperties
                    }
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        disabled={{ after: new Date() }}
                        onSelect={(selected) => {
                            onChange(toValue(selected));
                            setOpen(false);
                        }}
                        autoFocus
                        className="bg-charcoal-navy text-white [--cell-size:--spacing(13)]"
                        classNames={{
                            months: 'flex w-full flex-col gap-2',
                            month_caption:
                                'flex w-full items-center justify-center text-[1.6rem] font-semibold text-white',
                            caption_label: 'text-white',
                            weekdays:
                                'w-full flex-items-center justify-between  ',
                            weekday:
                                'text-[1.4rem] font-medium text-silver-gray',
                            nav: 'flex w-full items-center justify-between',
                            button_previous:
                                'text-white hover:bg-white/10 hover:text-white',
                            button_next:
                                'text-white hover:bg-white/10 hover:text-white',
                            day: 'text-[1.6rem] text-white data-[selected-single=true]:bg-primary-red data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-primary-red',
                            today: 'rounded-md bg-white/10 text-white',
                            outside:
                                'text-white/30 aria-selected:text-white/30',
                            disabled: 'text-white/30 opacity-50',
                        }}
                    />
                </PopoverContent>
            </Popover>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default DatePicker;
