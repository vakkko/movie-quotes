import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

type ImagePreviewProps = {
    preview: string;
    onRemove: () => void;
};

const ImagePreview = ({ preview, onRemove }: ImagePreviewProps) => {
    const { t } = useTranslation();

    return (
        <div className="relative mx-auto w-fit">
            <img
                src={preview}
                alt={t('preview')}
                className="h-56 w-[43.3rem] object-cover"
            />
            <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-0 right-2 h-6 w-6 bg-deep-navy!"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default ImagePreview;
