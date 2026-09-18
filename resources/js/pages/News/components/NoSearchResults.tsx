import { useTranslation } from '@/hooks/useTranslation';

const NoSearchResults = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-[4rem] max-w-[89rem] rounded-[1.2rem] bg-deep-navy p-[2.4rem] text-white">
            <p className="text-[2rem]">{t('no_movies_or_quotes_found')}</p>
        </div>
    );
};

export default NoSearchResults;
