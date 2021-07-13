import { defineProperty as _defineProperty, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { blockEditor } from 'wp';
import { RemoveButton, SelectButtonWithPreview, SelectButton } from './buttons.js';
import { DEFAULT_ID_ATTRIBUTE_NAME, DEFAULT_URL_ATTRIBUTE_NAME, DEFAULT_ALT_ATTRIBUTE_NAME } from './defaults.js';

var MediaUpload = blockEditor.MediaUpload;
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

var ImageSelect = function ImageSelect(props) {
  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute,
      _props$removeButton = props.removeButton,
      removeButton = _props$removeButton === void 0 ? true : _props$removeButton,
      setAttributes = props.setAttributes,
      _props$withPreview = props.withPreview,
      withPreview = _props$withPreview === void 0 ? false : _props$withPreview;

  var getOnSelectImage = function getOnSelectImage(idAttribute, urlAttribute, altAttribute) {
    return function (_ref) {
      var _setAttributes;

      var url = _ref.url,
          id = _ref.id,
          alt = _ref.alt;
      setAttributes((_setAttributes = {}, _defineProperty(_setAttributes, idAttribute, id), _defineProperty(_setAttributes, urlAttribute, url), _defineProperty(_setAttributes, altAttribute, alt), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-image-select",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: getOnSelectImage(idAttribute, urlAttribute, altAttribute),
    allowedTypes: "image",
    value: attributes[idAttribute],
    render: function render(_ref2) {
      var open = _ref2.open;
      var SelectButtonComponent = withPreview ? SelectButtonWithPreview : SelectButton;
      return /*#__PURE__*/React.createElement(SelectButtonComponent, _extends({
        open: open
      }, props));
    }
  }), removeButton && (attributes[urlAttribute] || attributes[idAttribute]) && /*#__PURE__*/React.createElement(RemoveButton, props)));
};

export { ImageSelect };
//# sourceMappingURL=index.js.map
