import { components, i18n } from 'wp';

var Button = components.Button,
    TextControl = components.TextControl;
var __ = i18n.__;
var Controls = function Controls(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-fontawesome-picker__controls"
  }, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Search by icon name', 'ghwp'),
    value: value,
    onChange: onChange
  }), /*#__PURE__*/React.createElement(Button, {
    className: "ghwp-fontawesome-picker__controls__reset",
    isLarge: true,
    onClick: onClick
  }, __('Reset', 'ghwp')));
};

export { Controls };
//# sourceMappingURL=Controls.js.map
