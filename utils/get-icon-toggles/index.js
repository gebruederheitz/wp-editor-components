/* eslint-disable indent */
import { components, i18n } from 'wp';

import { InputWithIcon } from '../../components';

const { ToolbarButton } = components;
const { __ } = i18n;

/**
 *
 * @param props
 * @param {Element}  props.icon
 * @param {string}   props.labelText
 * @param {boolean}  props.checked
 * @param {function} props.onChange
 * @return {{toolbar: *, large: *}}
 */

export const getIconToggles = (props) => {
    const { checked, icon, labelText, onChange } = props;
    const label = __(labelText, 'ghwp');

    return {
        large: () => (
            <InputWithIcon
                component={'toggle'}
                label={label}
                checked={checked}
                onChange={onChange}
                icon={icon}
            />
        ),
        toolbar: () => (
            <ToolbarButton
                isPressed={checked || null}
                label={label}
                icon={icon}
                onClick={() => {
                    onChange(!checked);
                }}
            />
        ),
    };
};
