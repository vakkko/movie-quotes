import type { ChangeEvent, PropsWithChildren } from 'react';
import Google from '@/components/svgs/Google';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';

type AuthContentProps = PropsWithChildren & {
    header: string;
    subHeader: string;
    button: string;
    handleSubmit: (e: ChangeEvent) => void;
    processing: boolean;
    footerText?: string;
    footerAction?: string;
    onFooterActionClick?: () => void;
    googleAuthText?: string;
    onGoogleAuthClick?: () => void;
    backToLogin?: boolean;
};

const AuthContent = ({
    children,
    header,
    subHeader,
    button,
    handleSubmit,
    processing,
    footerText,
    footerAction,
    onFooterActionClick,
    googleAuthText,
    onGoogleAuthClick,
}: AuthContentProps) => {
    return (
        <DialogContent
            className="w-full rounded-none border-none bg-dark-navy p-4 p-[12rem] py-[5.3rem] text-white max-sm:h-full max-sm:max-w-none max-sm:px-[2.4rem] sm:max-w-5xl sm:rounded-[1rem]"
            showCloseButton={false}
        >
            <DialogHeader className="mb-[2.4rem[ flex-column items-center">
                <h3 className="font-500-size-32 leading-[120%] whitespace-nowrap">
                    {header}
                </h3>
                <p className="text-center text-[1.6rem] text-slate-gray">
                    {subHeader}
                </p>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <FieldGroup className="gap-0">
                    {children}
                    <Field>
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-[2rem] button-primary-red-background"
                        >
                            {button}
                        </button>
                    </Field>
                </FieldGroup>
            </form>
            <div className="flex-column items-center">
                {googleAuthText && (
                    <button
                        type="button"
                        onClick={onGoogleAuthClick}
                        className="flex-items-center w-full button-transparent-background-white-border justify-center gap-[0.8rem]"
                    >
                        <Google />
                        {googleAuthText}
                    </button>
                )}

                {footerText && footerAction && onFooterActionClick && (
                    <p className="mt-[2rem] text-center text-[1.4rem] text-slate-gray">
                        {footerText}
                        <button
                            type="button"
                            onClick={onFooterActionClick}
                            className="text-blue-underline"
                        >
                            {footerAction}
                        </button>
                    </p>
                )}
            </div>
        </DialogContent>
    );
};

export default AuthContent;
