import {
    Avatar,
    AvatarImage as AvatarImagePrimitive,
} from '@/components/ui/avatar';

type AvatarImageProps = {
    src: string | null;
    alt: string;
};

const AvatarImage = ({ src, alt }: AvatarImageProps) => {
    return (
        <Avatar className="size-[5.2rem]">
            <AvatarImagePrimitive
                src={src ? src : '/images/defaultUser.png'}
                alt={alt}
                className="object-cover"
            />
        </Avatar>
    );
};

export default AvatarImage;
