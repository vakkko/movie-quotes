import { Camera } from 'lucide-react';
import { useImperativeHandle } from 'react';
import type { ChangeEvent, Ref } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import ImagePreview from './ImagePreview';
import { useImageUpload } from './useImageUpload';

export type ImageUploadHandle = {
    reset: () => void;
};

type ImageUploadProps = {
    error?: string;
    onFileChange?: (file: File | null) => void;
    initialPreview?: string | null;
    ref?: Ref<ImageUploadHandle>;
};

function ImageUpload({
    error,
    onFileChange,
    initialPreview,
    ref,
}: ImageUploadProps) {
    const { t } = useTranslation();
    const {
        preview,
        isDragging,
        handleChange,
        clear,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        inputRef,
    } = useImageUpload(initialPreview, onFileChange);

    useImperativeHandle(ref, () => ({
        reset: clear,
    }));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.files?.[0] ?? null);
    };

    return (
        <div className="flex h-[20rem] w-full flex-col gap-1 outline-none">
            <div
                className={cn(
                    'flex h-full w-full items-center overflow-hidden rounded-md',
                    {
                        flex: preview,
                    },
                )}
            >
                {preview && <ImagePreview preview={preview} onRemove={clear} />}
                <label
                    htmlFor="image-upload"
                    className={cn(
                        'flex h-32 w-full cursor-pointer items-center justify-start rounded-md border border-slate-gray pl-[1.6rem]',
                        {
                            'flex-column items-center justify-center gap-8 border-none':
                                preview,
                            'border-primary-red': isDragging,
                        },
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {preview && (
                        <span className="font-700-size-18 text-cream">
                            {t('change_image')}
                        </span>
                    )}
                    <span className="mr-[1.6rem] ml-[0.8rem] flex-items-center gap-4 text-[2rem] text-gray-500 max-sm:text-[1.2rem]">
                        <Camera />
                        {t('drag_and_drop_image')}
                    </span>
                    <button
                        type="button"
                        className="rounded-[0.4rem] bg-blue-overlay p-4 text-[1.8rem] max-sm:text-[1rem]"
                        onClick={() => inputRef.current?.click()}
                    >
                        {t('choose_file')}
                    </button>
                    <Input
                        ref={inputRef}
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
}

export default ImageUpload;
