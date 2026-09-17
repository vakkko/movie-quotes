import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import StyledAnchor from '@/components/StyledAnchor';
import Verified from '@/components/svgs/Verified';
import Warning from '@/components/svgs/Warning';
import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthModal } from '@/pages/Landing/useAuthModal';
import { news } from '@/routes';
import { send as resendVerification } from '@/routes/verification';
import type { Quote } from '@/types';
import type { SharedPageProps } from '@/types/global';

import StatusModal from './components/StatusModal/StatusModal';
import StickyQuotes from './components/StickyQuotes/StickyQuotes';

type LandingProps = SharedPageProps & { quotes: Quote[] };

const Landing = ({
    verifyExpired,
    verificationSent,
    unverifiedEmail,
    unverifiedEmailAddress,
    quotes,
}: LandingProps) => {
    const { t } = useTranslation();
    const { user } = usePage<SharedPageProps>().props;
    const { setActiveModal } = useAuthModal();

    const [showExpiredModal, setShowExpiredModal] = useState(verifyExpired);
    const [showSentModal, setShowSentModal] = useState(verificationSent);
    const [prevUnverifiedEmail, setPrevUnverifiedEmail] =
        useState(unverifiedEmail);
    const [showUnverifiedModal, setShowUnverifiedModal] =
        useState(unverifiedEmail);

    if (prevUnverifiedEmail !== unverifiedEmail) {
        setPrevUnverifiedEmail(unverifiedEmail);

        if (unverifiedEmail) {
            setShowUnverifiedModal(true);
        }
    }

    const handleResendVerification = () => {
        router.post(
            resendVerification.url(),
            { email: unverifiedEmailAddress as string },
            {
                onSuccess: () => {
                    setShowExpiredModal(false);
                    setShowUnverifiedModal(false);
                },
            },
        );
    };

    return (
        <>
            <div className="mx-auto flex-column w-[36.6%] items-center gap-[2.4rem] pt-[28rem] pb-[21rem] max-lg:w-[65%]">
                <h1 className="text-center font-montserrat font-700-size-60 leading-[150%] text-cream max-xl:text-[4rem] max-sm:text-[2.4rem]">
                    {t('hero_title')}
                </h1>
                {user ? (
                    <StyledAnchor href={news.url()} redBackground>
                        {t('get_started')}
                    </StyledAnchor>
                ) : (
                    <button
                        type="button"
                        className="button-primary-red-background text-center"
                        onClick={() => setActiveModal('login')}
                    >
                        {t('get_started')}
                    </button>
                )}
            </div>
            <StickyQuotes quotes={quotes} />
            <StatusModal
                showModal={showExpiredModal}
                setShowModal={setShowExpiredModal}
                header={t('link_expired')}
                infotext={t('verify_link_expired')}
                anchorText={t('request_new_link')}
                onAction={handleResendVerification}
            >
                <Warning />
            </StatusModal>
            <StatusModal
                showModal={showSentModal}
                setShowModal={setShowSentModal}
                header={t('thank_you')}
                infotext={t('email_activated')}
                anchorText={t('go_to_news')}
                href="/news"
            >
                <Verified />
            </StatusModal>
            <StatusModal
                showModal={showUnverifiedModal}
                setShowModal={setShowUnverifiedModal}
                header={t('email_not_verified')}
                infotext={t('verify_email_warning')}
                anchorText={t('request_new_link')}
                onAction={handleResendVerification}
                closeStatusModal={() => setShowUnverifiedModal(false)}
            >
                <Warning />
            </StatusModal>
        </>
    );
};

Landing.layout = (page: React.ReactNode) => (
    <DefaultLayout className="m-0 flex-col gap-0 pr-0">{page}</DefaultLayout>
);

export default Landing;
