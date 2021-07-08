/* eslint-disable indent */
// ^ eslint and prettier disagree
import { blockEditor } from 'wp';

import { RemoveButton, SelectButton, SelectButtonWithPreview } from './buttons';
import {
    DEFAULT_ALT_ATTRIBUTE_NAME,
    DEFAULT_ID_ATTRIBUTE_NAME,
    DEFAULT_URL_ATTRIBUTE_NAME,
} from './defaults';

const { MediaUpload } = blockEditor;

/**
 * An image selector with optional preview and remove button
 *
 * @param {object}   props
 * @param {object}   props.attributes           Pass down the props of the parent component so attributes can be read
 *                                              and set
 * @param {function} props.setAttributes
 *
 * @param {?string}  props.idAttribute       ['mediaID']
 *                                             Use this to set a different attribute name for the image's media ID. It's
 *                                             where the image ID is read from and written to on change events.
 * @param {?string}  props.urlAttribute      ['mediaURL']
 *                                             Use this to set a different attribute name for the image's URL.
 * @param {?string}  props.altAttribute      ['mediaAltText']
 *                                             Use this to set a different attribute name for the image's alt text.
 * @param {?string}  props.buttonLabel       ['Upload / select image']
 *                                             You can use this option to set a different button text when no image is
 *                                           selected
 * @param {?string}  props.buttonChangeLabel ['Change image']
 *                                             You can use this to change the button text when an image is selected.
 * @param {?string}  props.imageElementClassName  ['']
 *                                             Set a custom class name on the image element when using "withPreview"
 * @param {boolean}  props.removeButton      [true]
 *                                             Set this option to `false` if you don't need the ability to clear the
 *                                             attributes and remove the image
 * @param {boolean}  props.withPreview       [false]
 *                                             Pass this option to enable a preview of the selected image instead of the
 *                                             change button.
 * @return {*}
 * @constructor
 */
export const ImageSelect = (props) => {
    const {
        attributes,
        // imageElementClassName = '',
        idAttribute = DEFAULT_ID_ATTRIBUTE_NAME,
        urlAttribute = DEFAULT_URL_ATTRIBUTE_NAME,
        altAttribute = DEFAULT_ALT_ATTRIBUTE_NAME,
        removeButton = true,
        setAttributes,
        withPreview = false,
    } = props;

    const getOnSelectImage = (idAttribute, urlAttribute, altAttribute) => {
        return ({ url, id, alt }) => {
            setAttributes({
                [idAttribute]: id,
                [urlAttribute]: url,
                [altAttribute]: alt,
            });
        };
    };

    return (
        <div
            className="ghwp-editor-image-select"
            style={{ textAlign: 'center' }}
        >
            <div className="button-group">
                <MediaUpload
                    onSelect={getOnSelectImage(
                        idAttribute,
                        urlAttribute,
                        altAttribute
                    )}
                    allowedTypes="image"
                    value={attributes[idAttribute]}
                    render={({ open }) => {
                        const SelectButtonComponent = withPreview
                            ? SelectButtonWithPreview
                            : SelectButton;
                        return <SelectButtonComponent open={open} {...props} />;
                    }}
                />
                {removeButton &&
                    (attributes[urlAttribute] || attributes[idAttribute]) && (
                        <RemoveButton {...props} />
                    )}
            </div>
        </div>
    );
};
