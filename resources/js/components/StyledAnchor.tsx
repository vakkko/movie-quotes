import { Link } from '@inertiajs/react';

import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type StyledAnchorTypes = PropsWithChildren & {
    href: string;
    redBackground?: boolean;
};

const StyledAnchor = ({ children, href, redBackground }: StyledAnchorTypes) => {
    return (
        <Link
            className={cn(
                'text-center',
                redBackground
                    ? 'button-primary-red-background'
                    : 'button-transparent-background-white-border',
            )}
            href={href}
        >
            {children}
        </Link>
    );
};

export default StyledAnchor;
