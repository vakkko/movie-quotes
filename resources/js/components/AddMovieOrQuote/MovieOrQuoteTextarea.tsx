import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

type MovieOrQuoteTextareaProps = {
    placeholder: string;
    languageBadge: string;
    whitePlaceholder?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    error?: string;
};

const MovieOrQuoteTextarea = ({
    placeholder,
    languageBadge,
    whitePlaceholder,
    value,
    onChange,
    name,
    error,
}: MovieOrQuoteTextareaProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="relative">
                <Textarea
                    className={cn('min-h-[8.6rem] pr-[5.5rem]', {
                        'placeholder:text-white placeholder:not-italic':
                            whitePlaceholder,
                    })}
                    placeholder={placeholder}
                    value={value ?? ''}
                    onChange={(e) =>
                        onChange ? onChange(e.target.value) : undefined
                    }
                    name={name}
                />
                <span className="text-2rem pointer-events-none absolute top-[1.3rem] right-[2rem]">
                    {languageBadge}
                </span>
            </div>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default MovieOrQuoteTextarea;
