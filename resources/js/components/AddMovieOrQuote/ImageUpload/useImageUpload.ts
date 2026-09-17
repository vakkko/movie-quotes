import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';

export const useImageUpload = (
    initialPreview: string | null = null,
    onFileChange?: (file: File | null) => void,
) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialPreview);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleChange = (newFile: File | null) => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }

        setFile(newFile);

        if (newFile) {
            objectUrlRef.current = URL.createObjectURL(newFile);
            setPreview(objectUrlRef.current);
        } else {
            setPreview(null);
        }

        onFileChange?.(newFile);
    };

    const clear = () => {
        handleChange(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const newFile = e.dataTransfer.files?.[0] ?? null;

        if (newFile) {
            handleChange(newFile);
        }
    };

    return {
        file,
        preview,
        isDragging,
        handleChange,
        clear,
        inputRef,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
};
