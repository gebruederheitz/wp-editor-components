import { components, i18n } from 'wp';
import classnames from 'classnames';

const { TextareaControl, TextControl } = components;
const { __ } = i18n;

export const DiscreetInput = ({
    attributes,
    inline = false,
    labelText,
    valueKey,
    setAttributes,
    type = 'text',
}) => {
    let Component;
    switch (type) {
        case 'textarea':
            Component = TextareaControl;
            break;
        case 'text':
        default:
            Component = TextControl;
            break;
    }
    return (
        <Component
            className={classnames({
                'ghwp-editor-discreet-input': true,
                'ghwp-editor-discreet-input--inline': inline,
            })}
            hideLabelFromVision={true}
            label={__(labelText, 'ghwp')}
            placeholder={__(labelText, 'ghwp')}
            value={attributes[valueKey]}
            onChange={(newValue) => {
                setAttributes({ [valueKey]: newValue });
            }}
            type={type === 'number' ? 'number' : null}
        />
    );
};
