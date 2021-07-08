import { components, i18n } from 'wp';

const { Button, TextControl } = components;
const { __ } = i18n;

export const Controls = ({ value, onChange, onClick }) => {
    return (
        <div className="ghwp-fontawesome-picker__controls">
            <TextControl
                label={__('Search by icon name', 'ghwp')}
                value={value}
                onChange={onChange}
            />
            <Button
                className="ghwp-fontawesome-picker__controls__reset"
                isLarge
                onClick={onClick}
            >
                {__('Reset', 'ghwp')}
            </Button>
        </div>
    );
};
