import { extends as _extends, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { components } from 'wp';
import classnames from '../../node_modules/classnames/index.js';
import pick from '../../node_modules/lodash-es/pick.js';
import omitBy from '../../node_modules/lodash-es/omitBy.js';

var RangeControl = components.RangeControl,
    TextControl = components.TextControl,
    ToggleControl = components.ToggleControl;

var toggleWithIconStyles = function toggleWithIconStyles(highlighted) {
  var styles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '8px',
    border: '1px solid #ccc',
    justifyContent: 'space-between',
    width: '100%'
  };

  if (highlighted) {
    styles = Object.assign(styles, {
      borderColor: '#35f',
      borderWidth: '2px',
      boxShadow: '1px 1px 5px 0 #ddd'
    });
  }

  return styles;
};

var iconWrapperStyles = {
  paddingLeft: '8px',
  borderLeft: '1px solid #ccc',
  marginLeft: '8px',
  justifyContent: 'center',
  display: 'flex',
  alignSelf: 'stretch',
  flex: '0 0 40px'
};
var svgIconStyles = {
  width: '32px',
  height: '32px'
};
/**
 * A wrapper for various input components that puts them in a box with an icon.
 * In order to process changes, you will have to either provide the attribute's
 * name as a string along with the setAttributes function OR pass your own
 * onChange function.
 *
 * @param props
 * @param {Element|string} props.icon
 * @param {string}         props.label
 * @param {?function}      props.onChange
 * @param {?function}      props.setAttributes
 * @param {?string}        props.attributeName
 * @param {Element}        props.component
 * @param {boolean}        props.highlighted
 * @return {*}
 * @constructor
 */

var InputWithIcon = function InputWithIcon(props) {
  var _props$highlighted = props.highlighted,
      highlighted = _props$highlighted === void 0 ? false : _props$highlighted,
      Icon = props.icon,
      label = props.label,
      onChange = props.onChange,
      setAttributes = props.setAttributes,
      attributeName = props.attributeName,
      _props$component = props.component,
      Component = _props$component === void 0 ? TextControl : _props$component;
  var componentProps;

  switch (Component) {
    case 'toggle':
    case 'switch':
      Component = ToggleControl;
    // eslint-disable-next-line no-fallthrough

    case ToggleControl:
      componentProps = pick(props, ['checked']);
      break;

    case 'range':
      Component = RangeControl;
    // eslint-disable-next-line no-fallthrough

    case RangeControl:
      componentProps = pick(props, [// 'label',
      'help', 'beforeIcon', 'afterIcon', 'allowReset', 'disabled', 'initialPosition', 'isShiftStepEnabled', 'marks', // 'onChange',
      'min', 'max', 'railColor', 'renderTooltipContent', 'resetFallbackValue', 'showTooltip', 'step', 'trackColor', 'value', 'withInputField', 'icon', 'separatorType', 'type', 'shiftStep']);
      componentProps = omitBy(componentProps, function (el) {
        return el === null || typeof el === 'undefined';
      });
      break;

    case TextControl:
    default:
      componentProps = pick(props, ['type', 'value', 'max', 'min', 'step', 'placeholder', 'readonly']);
      break;
  }

  var defaultOnChange = function defaultOnChange(value) {
    setAttributes(_defineProperty({}, attributeName, value));
  };

  var containerStyles = toggleWithIconStyles(highlighted);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, "\n                .ghwp-editor-input-with-icon * {\n                    margin-bottom: 0 !important;\n                    align-items: center;\n                }\n\n                .ghwp-editor-input-with-icon .components-base-control__label {\n                    display: block;\n                    padding: 0 10px 5px 10px;\n                    text-align: center;\n                }\n\n                .ghwp-editor-input-with-icon--highlight {\n                     border-color: #35f;\n                     border-width: 2px;\n                     box-shadow: 1px 1px 5px 0 #ddd;\n                }\n            "), /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-editor-input-with-icon', {
      'ghwp-editor-input-with-icon': highlighted
    }),
    style: containerStyles
  }, /*#__PURE__*/React.createElement(Component, _extends({
    label: label,
    onChange: onChange || defaultOnChange
  }, componentProps)), /*#__PURE__*/React.createElement("div", {
    style: iconWrapperStyles
  }, /*#__PURE__*/React.createElement(Icon, {
    style: svgIconStyles
  }))));
};

export { InputWithIcon };
//# sourceMappingURL=index.js.map
