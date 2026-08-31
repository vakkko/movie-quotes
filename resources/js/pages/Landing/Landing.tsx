import { useState } from 'react';
import StyledAnchor from '@/components/StyledAnchor';
import Verified from '@/components/svgs/Verified';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import type { Quote } from '@/types';
import type { SharedPageProps } from '@/types/global';
import Header from './components/Header/Header';
import StickyQuotes from './components/StickyQuotes/StickyQuotes';

type LandingProps = SharedPageProps & { quotes: Quote[] };

const Landing = ({ verified, quotes }: LandingProps) => {
    const { t } = useTranslation();

    const [showSignedModal, setShowSignedModal] = useState(verified);

    return (
        <>
            <Header />
            <StickyQuotes quotes={quotes} />
            <Dialog open={showSignedModal} onOpenChange={setShowSignedModal}>
                <DialogContent
                    className="border-none bg-dark-navy px-[9rem] py-[6rem] text-white sm:max-w-3xl"
                    showCloseButton={false}
                >
                    <DialogHeader className="items-center">
                        <Verified />
                    </DialogHeader>
                    <div className="my-[3.9rem] text-center">
                        <h2 className="font-500-size-32 leading-[120%]">
                            Thank you!
                        </h2>
                        <p> {t('email_activated')}</p>
                    </div>
                    <StyledAnchor href="/news" redBackground>
                        Go to my news feed
                    </StyledAnchor>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Landing;
