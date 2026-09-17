import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type CustomErrorWrapperProps = PropsWithChildren & {
    errorHeading: string;
    errorText: string;
};

const CustomErrorWrapper = ({
    children,
    errorHeading,
    errorText,
}: CustomErrorWrapperProps) => {
    return (
        <div className="flex min-h-[100vh] flex-col items-center justify-center gap-[1.6rem] text-center">
            {children}
            <h2 className="font-700-size-50">{errorHeading}</h2>
            <p className="mb-[3rem] font-500-size-24">{errorText}</p>
            <a
                href="/"
                className={cn('button-primary-red-background text-center')}
            >
                Return Home
            </a>
        </div>
    );
};

export default CustomErrorWrapper;
