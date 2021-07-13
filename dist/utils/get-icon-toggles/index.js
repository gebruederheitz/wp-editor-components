import { components, i18n } from 'wp';
import '../../components/add-icon-button/index.js';
import '../../components/api-search/api-search.js';
import '../../components/discreet-input/index.js';
import '../../components/focusable/focus-button.js';
import '../../node_modules/classnames/index.js';
import '../../node_modules/@fortawesome/fontawesome-svg-core/index.es.js';
import '../../components/fontawesome/FontAwesomePicker.js';
import '../../components/image-select/index.js';
import { InputWithIcon } from '../../components/input-with-icon/index.js';
import '../../components/modal/index.js';
import '../../components/spinner-overlay/index.js';
import '../../components/with-block-inserters/index.js';
import '../../components/with-controlled-children/index.js';
import '../../components/with-focus-within/index.js';

/* eslint-disable indent */
var ToolbarButton = components.ToolbarButton;
var __ = i18n.__;
/**
 *
 * @param props
 * @param {Element}  props.icon
 * @param {string}   props.labelText
 * @param {boolean}  props.checked
 * @param {function} props.onChange
 * @return {{toolbar: *, large: *}}
 */

var getIconToggles = function getIconToggles(props) {
  var checked = props.checked,
      icon = props.icon,
      labelText = props.labelText,
      onChange = props.onChange;

  var label = __(labelText, 'ghwp');

  return {
    large: function large() {
      return /*#__PURE__*/React.createElement(InputWithIcon, {
        component: 'toggle',
        label: label,
        checked: checked,
        onChange: onChange,
        icon: icon
      });
    },
    toolbar: function toolbar() {
      return /*#__PURE__*/React.createElement(ToolbarButton, {
        isPressed: checked || null,
        label: label,
        icon: icon,
        onClick: function onClick() {
          onChange(!checked);
        }
      });
    }
  };
};

export { getIconToggles };
//# sourceMappingURL=index.js.map
