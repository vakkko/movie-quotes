import { ArrowLeft } from 'lucide-react';
import type { ChangeEvent, PropsWithChildren } from 'react';
import Google from '@/components/svgs/Google';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { useTranslation } from '@/hooks/useTranslation';

type Footer = {
    text: string;
    action: string;
    onActionClick?: () => void;
};

type GoogleAuth = {
    text: string;
    onClick: () => void;
};

type AuthContentProps = PropsWithChildren & {
    header: string;
    subHeader: string;
    buttonText: string;
    handleSubmit: (e: ChangeEvent) => void;
    processing: boolean;
    footerConfig?: Footer;
    googleAuthConfig?: GoogleAuth;
    switchToLogin?: () => void;
};

const AuthContent = ({
    children,
    header,
    subHeader,
    buttonText,
    handleSubmit,
    processing,
    footerConfig,
    googleAuthConfig,
    switchToLogin,
}: AuthContentProps) => {
    const { t } = useTranslation();

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
                            {buttonText}
                        </button>
                    </Field>
                </FieldGroup>
            </form>
            <div className="flex-column items-center">
                {googleAuthConfig && (
                    <button
                        type="button"
                        onClick={googleAuthConfig.onClick}
                        className="flex-items-center w-full button-transparent-background-white-border justify-center gap-[0.8rem]"
                    >
                        <Google />
                        {googleAuthConfig.text}
                    </button>
                )}

                {footerConfig && (
                    <p className="mt-[2rem] text-center text-[1.4rem] text-slate-gray">
                        {footerConfig.text}
                        <button
                            type="button"
                            onClick={footerConfig.onActionClick}
                            className="text-blue-underline"
                        >
                            {footerConfig.action}
                        </button>
                    </p>
                )}
                {switchToLogin && (
                    <button
                        onClick={switchToLogin}
                        className="flex-items-center gap-[1.1rem] text-slate-gray"
                    >
                        <ArrowLeft className="text-white" />
                        {t('back_to_login')}
                    </button>
                )}
            </div>
        </DialogContent>
    );
};

export default AuthContent;
