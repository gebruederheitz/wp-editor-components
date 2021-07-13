import { defineProperty as _defineProperty, objectWithoutProperties as _objectWithoutProperties } from '../../_virtual/_rollupPluginBabelHelpers.js';
import classnames from '../../node_modules/classnames/index.js';
import { components, i18n } from 'wp';
import { DEFAULT_ID_ATTRIBUTE_NAME, DEFAULT_BUTTON_LABEL, DEFAULT_BUTTON_CHANGE_LABEL, DEFAULT_URL_ATTRIBUTE_NAME, DEFAULT_ALT_ATTRIBUTE_NAME } from './defaults.js';

var _excluded = ["open"],
    _excluded2 = ["open"];
var Button = components.Button;
var __ = i18n.__;
var SelectButton = function SelectButton(_ref) {
  var open = _ref.open,
      props = _objectWithoutProperties(_ref, _excluded);

  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$buttonLabel = props.buttonLabel,
      buttonLabel = _props$buttonLabel === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel,
      _props$buttonChangeLa = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa;
  return /*#__PURE__*/React.createElement(Button, {
    isPrimary: true,
    onClick: open
  }, !attributes[idAttribute] ? __(buttonLabel, 'ghwp') : __(buttonChangeLabel, 'ghwp'));
};
var SelectButtonWithPreview = function SelectButtonWithPreview(_ref2) {
  var open = _ref2.open,
      props = _objectWithoutProperties(_ref2, _excluded2);

  var attributes = props.attributes,
      imageElementClassName = props.imageElementClassName,
      _props$idAttribute2 = props.idAttribute,
      idAttribute = _props$idAttribute2 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute2,
      _props$buttonLabel2 = props.buttonLabel,
      buttonLabel = _props$buttonLabel2 === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel2,
      _props$buttonChangeLa2 = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa2 === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa2,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute;
  return /*#__PURE__*/React.createElement(Button, {
    className: classnames([{
      'image-button': Boolean(attributes[idAttribute])
    }]),
    isPrimary: !attributes[idAttribute],
    style: {
      height: 'auto',
      minHeight: '36px'
    },
    onClick: open
  }, !attributes[idAttribute] ? __(buttonLabel, 'ghwp') : /*#__PURE__*/React.createElement("img", {
    className: imageElementClassName,
    src: attributes[urlAttribute],
    alt: __(buttonChangeLabel, 'ghwp')
  }));
};
var RemoveButton = function RemoveButton(props) {
  var setAttributes = props.setAttributes,
      _props$idAttribute3 = props.idAttribute,
      idAttribute = _props$idAttribute3 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute3,
      _props$urlAttribute2 = props.urlAttribute,
      urlAttribute = _props$urlAttribute2 === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute2,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute;

  var getOnRemoveImage = function getOnRemoveImage(idAttribute, urlAttribute, altAttribute) {
    return function () {
      var _setAttributes;

      setAttributes((_setAttributes = {}, _defineProperty(_setAttributes, urlAttribute, ''), _defineProperty(_setAttributes, idAttribute, ''), _defineProperty(_setAttributes, altAttribute, ''), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement(Button, {
    isDestructive: true,
    onClick: getOnRemoveImage(idAttribute, urlAttribute, altAttribute)
  }, __('Remove image', 'ghwp'));
};

export { RemoveButton, SelectButton, SelectButtonWithPreview };
//# sourceMappingURL=buttons.js.map
