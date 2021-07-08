import { blocks, i18n } from 'wp';

const { registerBlockStyle } = blocks;
const { __ } = i18n;

export function registerAdditionalStyles(blockName, styles) {
    styles.forEach((style) => {
        registerBlockStyle(blockName, {
            name: style.name,
            label: __(style.label, 'ghwp'),
        });
    });
}
