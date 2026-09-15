import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';

const NavLink = ({
    href,
    icon,
    children,
}: PropsWithChildren & { href: string; icon: ReactNode }) => {
    const { url } = usePage();
    const isActive = url.split('?')[0] === href;

    return (
        <li>
            <Link
                className="flex-items-center justify-start gap-[4.3rem]"
                href={href}
            >
                <span className={isActive ? 'text-primary-red' : ''}>
                    {icon}
                </span>
                {children}
            </Link>
        </li>
    );
};

export default NavLink;