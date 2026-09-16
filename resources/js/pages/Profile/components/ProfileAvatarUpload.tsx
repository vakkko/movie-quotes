import { useImperativeHandle } from 'react';
import type { ChangeEvent, Ref } from 'react';
import { useImageUpload } from '@/components/AddMovieOrQuote/ImageUpload/useImageUpload';
import {
    Avatar,
    AvatarImage as AvatarImagePrimitive,
} from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

export type ProfileAvatarUploadHandle = {
    reset: () => void;
};

type ProfileAvatarUploadProps = {
    src: string | null;
    alt: string;
    error?: string;
    onFileChange?: (file: File | null) => void;
    ref?: Ref<ProfileAvatarUploadHandle>;
};

function ProfileAvatarUpload({
    src,
    alt,
    error,
    onFileChange,
    ref,
}: ProfileAvatarUploadProps) {
    const { t } = useTranslation();
    const { preview, handleChange, clear, inputRef } = useImageUpload(src);

    useImperativeHandle(ref, () => ({
        reset: clear,
    }));

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        handleChange(file);
        onFileChange?.(file);
    };

    return (
        <div className="absolute top-[-8rem] flex-column w-fit items-center gap-[0.8rem]">
            <div className="relative">
                <Avatar className="size-[16rem]">
                    <AvatarImagePrimitive
                        src={preview ?? src ?? '/images/defaultUser.png'}
                        alt={alt}
                        className="object-cover"
                    />
                </Avatar>
                <Input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label={t('upload_photo')}
                className="text-[2rem] leading-[150%] text-silver-gray"
            >
                <span>{t('upload_photo')}</span>
            </button>
            {error && (
                <span className="text-[1.4rem] text-primary-red">{error}</span>
            )}
        </div>
    );
}

export default ProfileAvatarUpload;
