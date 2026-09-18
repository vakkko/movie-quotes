import { Menu } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProfileAndNavSection from '@/layouts/ProfileAndNavSection/ProfileAndNavSection';

type MobileMenuProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
            <button type="button" className="lg:hidden">
                <Menu color="white" />
            </button>
        </SheetTrigger>
        <SheetContent
            side="left"
            className="max-h-[80vh] !max-w-[90vw] rounded-xl border-r-0 px-16 pt-24"
            showCloseButton={false}
        >
            <ProfileAndNavSection />
        </SheetContent>
    </Sheet>
);

export default MobileMenu;
