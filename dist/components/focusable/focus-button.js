import { components } from 'wp';
import classnames from '../../node_modules/classnames/index.js';
import { FontAwesomeIcon } from '../fontawesome/FontAwesomeIcon.js';
import '../../node_modules/@fortawesome/free-solid-svg-icons/faCog.js';
import { __exports as faCog } from '../../_virtual/faCog.js_commonjs-exports';

var Button = components.Button;
var FocusButton = function FocusButton(_ref) {
  var isSelected = _ref.isSelected,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick;
  return /*#__PURE__*/React.createElement(Button, {
    className: classnames({
      'ghwp-editor-focus-button': true,
      'is-hidden': isSelected
    }),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCog.faCog
  }));
};

export { FocusButton };
//# sourceMappingURL=focus-button.js.map
