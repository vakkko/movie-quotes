import { Camera } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type QuotePosterProps = {
    src?: string;
    alt?: string;
    preview?: string | null;
    onChangeFile?: (file: File | null) => void;
};

const QuotePoster = ({ src, alt, preview, onChangeFile }: QuotePosterProps) => {
    const { t } = useTranslation();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        onChangeFile?.(file);
    };

    return (
        <div className="relative w-fit">
            <img
                className="h-[50rem] w-[84rem] rounded-[1rem] object-cover"
                src={preview ?? src}
                alt={alt}
            />
            {onChangeFile && (
                <label
                    htmlFor="quote-image-change"
                    className="absolute top-1/2 left-1/2 flex-column -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-[0.8rem] rounded-[1.6rem] bg-charcoal-navy p-[2rem] text-white opacity-90 backdrop-blur transition-opacity hover:opacity-80"
                >
                    <Camera size={28} className="text-white" />
                    <span className="text-[1.8rem] whitespace-nowrap">
                        {t('change_image')}
                    </span>
                    <input
                        id="quote-image-change"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
            )}
        </div>
    );
};

export default QuotePoster;
