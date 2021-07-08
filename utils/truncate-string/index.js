import truncate from 'lodash-es/truncate';

export const DEFAULT_TRUNCATED_STRING_LENGTH = 100;

export const truncateString = (string, options = {}) => {
    const {
        length = DEFAULT_TRUNCATED_STRING_LENGTH,
        omission = '...',
        separator = ' ',
    } = options;

    return truncate(string, {
        length,
        omission,
        separator,
    });
};
