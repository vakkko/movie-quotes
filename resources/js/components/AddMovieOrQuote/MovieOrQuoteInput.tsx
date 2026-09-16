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
                    className="text:leading-[150%] border border-slate-gray !bg-transparent !py-[2rem] pl-[1.6rem] !text-[2rem] text-white outline-none placeholder:text-[2rem] placeholder:text-white focus-visible:border-slate-gray focus-visible:ring-0 disabled:cursor-default disabled:opacity-100"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    name={name}
                    readOnly={readOnly}
                />
                {languageBadge && (
                    <span className="text-2rem pointer-events-none absolute top-[1rem] right-[2rem]">
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
