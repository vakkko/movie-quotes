import { useRef, useState } from 'react';

export const useImageUpload = (initialPreview: string | null = null) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialPreview);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (newFile: File | null) => {
        setFile(newFile);
        setPreview(newFile ? URL.createObjectURL(newFile) : null);
    };

    const clear = () => {
        setFile(null);
        setPreview(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return { file, preview, handleChange, clear, inputRef };
};
