import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

type MovieOrQuoteTextareaProps = {
    placeholder: string;
    languageBadge: string;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    error?: string;
    readOnly?: boolean;
    editMovie?: boolean;
};

const MovieOrQuoteTextarea = ({
    placeholder,
    languageBadge,
    value,
    onChange,
    name,
    error,
    readOnly,
    editMovie,
}: MovieOrQuoteTextareaProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="relative border border-slate-gray px-[1.6rem] py-[1.3rem]">
                <div className="flex items-baseline gap-2 pr-[5.5rem]">
                    {editMovie && (
                        <span className="shrink-0 whitespace-nowrap text-gray-500">
                            {placeholder}:
                        </span>
                    )}
                    <Textarea
                        className={cn(
                            '!placeholder:text-gray-500 min-h-[8.6rem] resize-none !border-0 !bg-transparent !p-0',
                            {
                                'cursor-default opacity-100': readOnly,
                            },
                        )}
                        placeholder={editMovie ? undefined : placeholder}
                        value={value ?? ''}
                        onChange={(e) =>
                            onChange ? onChange(e.target.value) : undefined
                        }
                        name={name}
                        readOnly={readOnly}
                    />
                </div>
                <span className="text-2rem pointer-events-none absolute top-[1.3rem] right-8 text-gray-500">
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
