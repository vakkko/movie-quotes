import { useState } from 'react';
import Eye from '@/components/svgs/Eye';
import EyeSlash from '@/components/svgs/EyeSlash';
import { Field, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';

type ProfileInputFieldProps = {
    label: string;
    htmlFor: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    autoComplete?: string;
};

const ProfileInputField = ({
    label,
    htmlFor,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = true,
    autoComplete,
}: ProfileInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasEyeIcon = type === 'password';
    const inputType = hasEyeIcon ? (showPassword ? 'text' : 'password') : type;

    const isTouched = value.length > 0 || !!error;
    const isValid = !error && value.length > 0;

    return (
        <Field className="mr-auto w-[85%]">
            <label htmlFor={htmlFor}>
                {label}
                {required && (
                    <span className="ml-[0.4rem] text-primary-red">*</span>
                )}
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
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-0 mr-[1.4rem] -translate-y-1/2"
                    >
                        {showPassword ? <Eye /> : <EyeSlash />}
                    </button>
                )}
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

export default ProfileInputField;
