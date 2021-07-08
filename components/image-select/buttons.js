import classnames from 'classnames';
import { components, i18n } from 'wp';

import {
    DEFAULT_ALT_ATTRIBUTE_NAME,
    DEFAULT_BUTTON_CHANGE_LABEL,
    DEFAULT_BUTTON_LABEL,
    DEFAULT_ID_ATTRIBUTE_NAME,
    DEFAULT_URL_ATTRIBUTE_NAME,
} from './defaults';

const { Button } = components;
const { __ } = i18n;

export const SelectButton = ({ open, ...props }) => {
    const {
        attributes,
        idAttribute = DEFAULT_ID_ATTRIBUTE_NAME,
        buttonLabel = DEFAULT_BUTTON_LABEL,
        buttonChangeLabel = DEFAULT_BUTTON_CHANGE_LABEL,
    } = props;

    return (
        <Button isPrimary onClick={open}>
            {!attributes[idAttribute]
                ? __(buttonLabel, 'ghwp')
                : __(buttonChangeLabel, 'ghwp')}
        </Button>
    );
};

export const SelectButtonWithPreview = ({ open, ...props }) => {
    const {
        attributes,
        imageElementClassName,
        idAttribute = DEFAULT_ID_ATTRIBUTE_NAME,
        buttonLabel = DEFAULT_BUTTON_LABEL,
        buttonChangeLabel = DEFAULT_BUTTON_CHANGE_LABEL,
        urlAttribute = DEFAULT_URL_ATTRIBUTE_NAME,
    } = props;

    return (
        <Button
            className={classnames([
                {
                    'image-button': Boolean(attributes[idAttribute]),
                },
            ])}
            isPrimary={!attributes[idAttribute]}
            style={{ height: 'auto', minHeight: '36px' }}
            onClick={open}
        >
            {!attributes[idAttribute] ? (
                __(buttonLabel, 'ghwp')
            ) : (
                <img
                    className={imageElementClassName}
                    src={attributes[urlAttribute]}
                    alt={__(buttonChangeLabel, 'ghwp')}
                />
            )}
        </Button>
    );
};

export const RemoveButton = (props) => {
    const {
        setAttributes,
        idAttribute = DEFAULT_ID_ATTRIBUTE_NAME,
        urlAttribute = DEFAULT_URL_ATTRIBUTE_NAME,
        altAttribute = DEFAULT_ALT_ATTRIBUTE_NAME,
    } = props;

    const getOnRemoveImage = (idAttribute, urlAttribute, altAttribute) => {
        return () => {
            setAttributes({
                [urlAttribute]: '',
                [idAttribute]: '',
                [altAttribute]: '',
            });
        };
    };

    return (
        <Button
            isDestructive
            onClick={getOnRemoveImage(idAttribute, urlAttribute, altAttribute)}
        >
            {__('Remove image', 'ghwp')}
        </Button>
    );
};
