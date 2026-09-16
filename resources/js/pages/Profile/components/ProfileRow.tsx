import { useState } from 'react';
import Eye from '@/components/svgs/Eye';
import EyeSlash from '@/components/svgs/EyeSlash';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type ProfileRowProps = {
    label: string;
    displayValue: string;
    editing: boolean;
    onToggle: () => void;
    type?: 'text' | 'password';
    placeholder?: string;
    onChange?: (value: string) => void;
    error?: string;
    hideButton?: boolean;
};

const ProfileRow = ({
    label,
    displayValue,
    editing,
    onToggle,
    type = 'text',
    placeholder,
    onChange,
    error,
    hideButton,
}: ProfileRowProps) => {
    const { t } = useTranslation();
    const buttonLabel = editing ? t('cancel') : t('edit');
    const editable = Boolean(onChange);
    const [showPassword, setShowPassword] = useState(false);
    const showEye = editable && type === 'password';
    const inputType = showEye ? (showPassword ? 'text' : 'password') : type;

    const isTouched = editable && (displayValue.length > 0 || !!error);
    const isValid = editable && !error && displayValue.length > 0;

    return (
        <div className="flex-column w-full gap-[0.8rem]">
            <label>
                {label}
                {editable && (
                    <span className="ml-[0.4rem] text-primary-red">*</span>
                )}
            </label>
            <div className="flex-items-center gap-[1.6rem]">
                <div className="relative w-full">
                    <input
                        readOnly={!editable}
                        type={inputType}
                        placeholder={placeholder}
                        value={displayValue}
                        onChange={
                            editable
                                ? (event) => onChange?.(event.target.value)
                                : undefined
                        }
                        aria-invalid={!!error}
                        className={cn(
                            'w-full rounded-[0.4rem] bg-light-ash px-[1.3rem] py-[0.7rem] text-slate-gray focus:bg-silver-gray focus:shadow-[0_0_0_4px_var(--color-focus-shadow)]',
                            showEye ? 'pr-[4.8rem]' : '',
                            isTouched
                                ? isValid
                                    ? 'border border-solid border-bootstrap-green'
                                    : 'border border-primary-red'
                                : 'border border-transparent',
                        )}
                    />
                    {showEye && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-0 mr-[1.4rem] -translate-y-1/2"
                        >
                            {showPassword ? <Eye /> : <EyeSlash />}
                        </button>
                    )}
                </div>
                {!hideButton && (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="w-[7rem]"
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>
            {editable && error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
};

export default ProfileRow;
