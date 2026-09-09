import { Check } from 'lucide-react';
import { useState } from 'react';
import Eye from '@/components/svgs/Eye';
import EyeSlash from '@/components/svgs/EyeSlash';
import XCircled from '@/components/svgs/XCircled';
import { Field, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';

type AuthInputFieldProps = {
    label: string;
    htmlFor: string;
    type?: string;
    placeholder: string;
    autoComplete: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

const AuthInputField = ({
    label,
    htmlFor,
    type = 'text',
    placeholder,
    autoComplete,
    value,
    onChange,
    error,
}: AuthInputFieldProps) => {
    const [toggleEyeIcon, setToggleEyeIcon] = useState(false);

    const handleEyeIconClick = () => setToggleEyeIcon((prev) => !prev);
    const hasEyeIcon = type === 'password';

    const inputType = hasEyeIcon ? (toggleEyeIcon ? 'text' : 'password') : type;

    const handleClear = () => {
        onChange('');
    };

    const isTouched = value.length > 0 || !!error;
    const isValid = !error && value.length > 0;

    return (
        <Field>
            <label htmlFor={htmlFor}>
                {label}
                <span className="ml-[0.4rem] text-primary-red">*</span>
            </label>
            <div className="relative w-full">
                <input
                    id={htmlFor}
                    name={htmlFor}
                    type={inputType}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    aria-invalid={!!error}
                    className={cn(
                        'w-full rounded-[0.4rem] bg-light-ash py-[0.7rem] pl-[1.3rem] text-slate-gray focus:bg-silver-gray focus:shadow-[0_0_0_4px_var(--color-focus-shadow)]',
                        isTouched
                            ? isValid
                                ? 'border border-solid border-bootstrap-green'
                                : 'border border-primary-red'
                            : 'border border-transparent',
                    )}
                />
                {hasEyeIcon && (
                    <button
                        type="button"
                        onClick={handleEyeIconClick}
                        className="absolute top-1/2 right-0 mr-[1.4rem] -translate-y-1/2"
                    >
                        {toggleEyeIcon ? <Eye /> : <EyeSlash />}
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleClear}
                    className={cn(
                        `absolute top-1/2 -translate-y-1/2 ${
                            hasEyeIcon ? 'right-[4.4rem]' : 'right-[1.4rem]'
                        }`,
                    )}
                >
                    {isValid ? (
                        <Check
                            className="text-bootstrap-green"
                            width="20"
                            height="20"
                        />
                    ) : (
                        <XCircled />
                    )}
                </button>
            </div>
            <FieldError
                className={cn(
                    'text-[1.4rem] transition-opacity duration-200',
                    error ? 'opacity-100' : 'opacity-0',
                )}
            >
                {error || '\u00A0'}
            </FieldError>
        </Field>
    );
};

export default AuthInputField;
