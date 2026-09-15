export type TranslateFn = (key: string) => string;

export const ENGLISH_REGEX = /^[a-zA-Z0-9\s\-':,.!?()&]+$/;

export const GEORGIAN_REGEX = /^[\u10D0-\u10FF\u0030-\u0039\u0020\u00A0\u200B]+$/;

export const createFieldValidator =
    (englishKeys: readonly string[], georgianKeys: readonly string[]) =>
    (key: string, value: string | string[] | File | null, t: TranslateFn): string => {
        if (key === 'image') {
            return value ? '' : t('validation_required');
        }

        if (!value || (typeof value === 'string' && value.trim() === '')) {
            return t('validation_required');
        }

        if (typeof value === 'string') {
            if (englishKeys.includes(key) && !ENGLISH_REGEX.test(value)) {
                return t('validation_english_letters');
            }

            if (georgianKeys.includes(key) && !GEORGIAN_REGEX.test(value)) {
                return t('validation_georgian_letters');
            }
        }

        return '';
    };