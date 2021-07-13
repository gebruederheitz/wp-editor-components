import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import classnames from '../../node_modules/classnames/index.js';
import { icon } from '../../node_modules/@fortawesome/fontawesome-svg-core/index.es.js';

var _excluded = ["icon", "large", "xl", "xxl", "small", "className", "raw"];
/**
 * Render a fontawesome icon as a React element
 *
 * @param {any}     iconDefinition  The SVG icon from @fortawesome/free-solid-svg-icons
 * @param {boolean} large           render large icon
 * @param {boolean} xl              render extra-large icon
 * @param {boolean} xxl             render huge icon
 * @param {boolean} small           render a small icon
 * @param {string}  className       Pass custom CSS classes to the element
 * @param {boolean} raw             Skip passing the default "ghwp-fa-icon" class
 * @param props
 * @return {*}
 * @constructor
 */

var FontAwesomeIcon = function FontAwesomeIcon(_ref) {
  var iconDefinition = _ref.icon,
      _ref$large = _ref.large,
      large = _ref$large === void 0 ? false : _ref$large,
      _ref$xl = _ref.xl,
      xl = _ref$xl === void 0 ? false : _ref$xl,
      _ref$xxl = _ref.xxl,
      xxl = _ref$xxl === void 0 ? false : _ref$xxl,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$raw = _ref.raw,
      raw = _ref$raw === void 0 ? false : _ref$raw,
      props = _objectWithoutProperties(_ref, _excluded);

  if (iconDefinition) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: classnames([className, {
        'ghwp-fa-icon': !raw,
        'ghwp-fa-large': large === true,
        'ghwp-fa-larger': xl === true,
        'ghwp-fa-largest': xxl === true,
        'ghwp-fa-small': small === true
      }]),
      dangerouslySetInnerHTML: {
        __html: icon(iconDefinition).html.pop()
      }
    }, props));
  }
};

export { FontAwesomeIcon };
//# sourceMappingURL=FontAwesomeIcon.js.map
