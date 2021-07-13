import { components } from 'wp';

var Icon = components.Icon;
var Modal = function Modal(_ref) {
  var onClose = _ref.onClose,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ghwp-editor-modal__content'
  }, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-modal__close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "no"
  })), children);
};

export { Modal };
//# sourceMappingURL=index.js.map
