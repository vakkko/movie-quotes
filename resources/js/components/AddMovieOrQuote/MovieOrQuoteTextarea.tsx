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
    readOnly?: boolean;
};

const MovieOrQuoteTextarea = ({
    placeholder,
    languageBadge,
    whitePlaceholder,
    value,
    onChange,
    name,
    error,
    readOnly,
}: MovieOrQuoteTextareaProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="relative">
                <Textarea
                    className={cn('min-h-[8.6rem] resize-none pr-[5.5rem]', {
                        'placeholder:text-white placeholder:not-italic':
                            whitePlaceholder,
                        'cursor-default opacity-100': readOnly,
                    })}
                    placeholder={placeholder}
                    value={value ?? ''}
                    onChange={(e) =>
                        onChange ? onChange(e.target.value) : undefined
                    }
                    name={name}
                    readOnly={readOnly}
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
