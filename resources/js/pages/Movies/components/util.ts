export const truncateTitle = (title: string): string => {
    const words = title.trim().split(/\s+/);

    if (words.length <= 2) {
        return title;
    }

    return `${words.slice(0, 2).join(' ')}...`;
};
