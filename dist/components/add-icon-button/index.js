import classnames from '../../node_modules/classnames/index.js';
import { components } from 'wp';
import { Add } from '../../icons/material-design-icons.js';

var Button = components.Button;
var AddIconButton = function AddIconButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement(Button, {
    className: classnames([className, 'components-icon-button']),
    isPrimary: true,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Add, {
    width: 16,
    height: 16,
    color: '#fff'
  }));
};

export { AddIconButton };
//# sourceMappingURL=index.js.map
