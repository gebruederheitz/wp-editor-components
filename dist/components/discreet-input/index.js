import { defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { components, i18n } from 'wp';
import classnames from '../../node_modules/classnames/index.js';

var TextareaControl = components.TextareaControl,
    TextControl = components.TextControl;
var __ = i18n.__;
var DiscreetInput = function DiscreetInput(_ref) {
  var attributes = _ref.attributes,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      labelText = _ref.labelText,
      valueKey = _ref.valueKey,
      setAttributes = _ref.setAttributes,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type;
  var Component;

  switch (type) {
    case 'textarea':
      Component = TextareaControl;
      break;

    case 'text':
    default:
      Component = TextControl;
      break;
  }

  return /*#__PURE__*/React.createElement(Component, {
    className: classnames({
      'ghwp-editor-discreet-input': true,
      'ghwp-editor-discreet-input--inline': inline
    }),
    hideLabelFromVision: true,
    label: __(labelText, 'ghwp'),
    placeholder: __(labelText, 'ghwp'),
    value: attributes[valueKey],
    onChange: function onChange(newValue) {
      setAttributes(_defineProperty({}, valueKey, newValue));
    },
    type: type === 'number' ? 'number' : null
  });
};

export { DiscreetInput };
//# sourceMappingURL=index.js.map
