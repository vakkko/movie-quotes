import { router, usePage } from '@inertiajs/react';
import DropDownArrow from '@/components/svgs/DropDownArrow';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SharedPageProps } from '@/types/global';

const LanguageDropDown = () => {
    const { props } = usePage<SharedPageProps>();

    const locale = props.locale ?? 'en';

    const switchLocale = (lang: 'en' | 'ka') => {
        if (lang === locale) {
            return;
        }

        router.get(
            window.location.pathname + window.location.search,
            { lang },
            {
                preserveState: false,
                preserveScroll: true,
            },
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex-items-center gap-[0.8rem] text-white">
                {locale === 'ka' ? 'Geo' : 'Eng'} <DropDownArrow />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[background-image:var(--header-gradient)]">
                <DropdownMenuGroup className="">
                    <DropdownMenuItem
                        className="cursor-pointer text-[1.4rem] text-white"
                        onSelect={() => switchLocale('en')}
                    >
                        Eng
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer text-[1.4rem] text-white"
                        onSelect={() => switchLocale('ka')}
                    >
                        Geo
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageDropDown;
