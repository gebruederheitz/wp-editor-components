import { faTimes } from '../../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js';
import { FontAwesomeIcon } from '../FontAwesomeIcon.js';

var CloseButton = function CloseButton(_ref) {
  var onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-fontawesome-picker__close",
    onClick: onClick
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes,
    xl: true
  }));
};

export { CloseButton };
//# sourceMappingURL=CloseButton.js.map
