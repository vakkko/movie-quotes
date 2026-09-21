import { Input } from '../ui/input';

type MovieOrQuoteInputProps = {
    placeholder: string;
    languageBadge?: string;
    value?: string;
    onChange: (value: string) => void;
    name: string;
    error?: string;
    readOnly?: boolean;
    editMovie?: boolean;
};

const MovieOrQuoteInput = ({
    placeholder,
    languageBadge,
    value,
    onChange,
    name,
    error,
    readOnly,
    editMovie,
}: MovieOrQuoteInputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="relative flex items-center gap-2 border border-slate-gray px-[1.6rem] py-[2rem]">
                {editMovie && (
                    <span className="shrink-0 text-[2rem] whitespace-nowrap text-gray-500">
                        {placeholder}:
                    </span>
                )}
                <Input
                    className="min-w-0 flex-1 !border-0 !bg-transparent !p-0 !text-[2.4rem] !leading-[150%] text-white outline-none selection:bg-bootstrap-blue! selection:text-white! placeholder:text-[2rem] placeholder:text-gray-500 focus-visible:ring-0 disabled:cursor-default disabled:opacity-100"
                    placeholder={editMovie ? undefined : placeholder}
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
