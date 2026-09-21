import { Input } from '../ui/input';

type MovieOrQuoteInputProps = {
    placeholder: string;
    languageBadge?: string;
    value?: string;
    onChange: (value: string) => void;
    name: string;
    error?: string;
    readOnly?: boolean;
};

const MovieOrQuoteInput = ({
    placeholder,
    languageBadge,
    value,
    onChange,
    name,
    error,
    readOnly,
}: MovieOrQuoteInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="relative">
                <Input
                    className="selection:bg-bootstrap-blue! selection:text-white! border border-slate-gray !bg-transparent !py-[2rem] pr-[5.5rem] pl-[1.6rem] !text-[2.4rem] !leading-[150%] text-white outline-none placeholder:text-[2rem] placeholder:text-gray-500 focus-visible:border-slate-gray focus-visible:ring-0 disabled:cursor-default disabled:opacity-100"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    name={name}
                    readOnly={readOnly}
                />
                {languageBadge && (
                    <span className="text-2rem pointer-events-none absolute top-[1rem] right-[2rem] text-gray-500">
                        {languageBadge}
                    </span>
                )}
            </div>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default MovieOrQuoteInput;
