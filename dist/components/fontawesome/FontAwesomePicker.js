import { inherits as _inherits, createSuper as _createSuper, createClass as _createClass, classCallCheck as _classCallCheck, assertThisInitialized as _assertThisInitialized } from '../../_virtual/_rollupPluginBabelHelpers.js';
import classnames from '../../node_modules/classnames/index.js';
import { element } from 'wp';
import { faPalette } from '../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js';
import debounce from '../../node_modules/lodash-es/debounce.js';
import { getFontAwesomeList } from './util.js';
import { CloseButton } from './components/CloseButton.js';
import { Controls } from './components/Controls.js';
import { FontAwesomeIcon } from './FontAwesomeIcon.js';

var Component = element.Component;

var FontAwesomePickerComponent = /*#__PURE__*/function (_Component) {
  _inherits(FontAwesomePickerComponent, _Component);

  var _super = _createSuper(FontAwesomePickerComponent);

  function FontAwesomePickerComponent(props) {
    var _this;

    _classCallCheck(this, FontAwesomePickerComponent);

    _this = _super.call(this, props);
    _this.timer = null;
    _this.onSearch = debounce(_this.onSearch, 600).bind(_assertThisInitialized(_this));
    _this.hideList = _this.hideList.bind(_assertThisInitialized(_this));
    _this.showList = _this.showList.bind(_assertThisInitialized(_this));
    _this.toggleList = _this.toggleList.bind(_assertThisInitialized(_this));
    _this.state = {
      listElementRendered: false,
      listElementVisible: false,
      isSearchActive: false,
      search: '',
      results: [],
      iconsByName: {},
      iconList: []
    };
    return _this;
  }

  _createClass(FontAwesomePickerComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initIcons();
    }
  }, {
    key: "hideList",
    value: function hideList() {
      var _this2 = this;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.setState({
        listElementVisible: false
      });
      this.timer = setTimeout(function () {
        _this2.setState({
          listElementRendered: false
        });

        _this2.timer = null;
      }, 1000);
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var _getFontAwesomeList = getFontAwesomeList(),
          iconsByName = _getFontAwesomeList.iconsByName,
          iconList = _getFontAwesomeList.list;

      this.setState({
        iconsByName: iconsByName,
        iconList: iconList
      });
    }
  }, {
    key: "isValidIcon",
    value: function isValidIcon(icon) {
      return Boolean(icon && icon.iconName && this.state.iconsByName[icon.iconName]);
    }
  }, {
    key: "onSearch",
    value: function onSearch(needle) {
      if (!needle) {
        this.setState({
          isSearchActive: false,
          results: []
        });
      } else {
        var regex = new RegExp("".concat(needle));
        var results = this.state.iconList.filter(function (iconObject) {
          return regex.test(iconObject.definition.iconName);
        });
        this.setState({
          results: results,
          isSearchActive: true
        });
      }
    }
  }, {
    key: "showList",
    value: function showList() {
      var _this3 = this;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.setState({
        listElementRendered: true
      });
      this.timer = setTimeout(function () {
        _this3.setState({
          listElementVisible: true
        });

        _this3.timer = null;
      }, 50);
    }
  }, {
    key: "toggleList",
    value: function toggleList() {
      if (this.state.listElementRendered) {
        this.hideList();
      } else {
        this.showList();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          _this$props$icon = _this$props.icon,
          icon = _this$props$icon === void 0 ? null : _this$props$icon,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? function () {} : _this$props$onChange;
      var _this$state = this.state,
          iconList = _this$state.iconList,
          isSearchActive = _this$state.isSearchActive,
          listElementRendered = _this$state.listElementRendered,
          listElementVisible = _this$state.listElementVisible,
          results = _this$state.results,
          search = _this$state.search;
      var isValidIcon = this.isValidIcon(icon);

      var _icon = isValidIcon ? icon : faPalette;

      var listShown = isSearchActive ? results : iconList;
      return /*#__PURE__*/React.createElement("div", {
        className: "ghwp-fontawesome-picker"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        className: classnames({
          'ghwp-fontawesome-picker__button': !isValidIcon,
          'ghwp-fontawesome-picker__icon': isValidIcon,
          'is-active': listElementRendered
        }),
        icon: _icon,
        large: true,
        onClick: this.toggleList
      }), listElementRendered && /*#__PURE__*/React.createElement("div", {
        className: classnames({
          'ghwp-fontawesome-picker__popup': true,
          'is-hidden': !listElementVisible
        })
      }, /*#__PURE__*/React.createElement(Controls, {
        value: search,
        onChange: function onChange(search) {
          _this4.setState({
            search: search
          });

          _this4.onSearch(search);
        },
        onClick: function onClick() {
          _this4.setState({
            results: [],
            search: '',
            isSearchActive: false
          });

          _this4.hideList();

          onChange(null);
        }
      }), /*#__PURE__*/React.createElement(CloseButton, {
        onClick: this.hideList
      }), /*#__PURE__*/React.createElement("div", {
        className: "ghwp-fontawesome-picker__list"
      }, listShown.map(function (iconObject, i) {
        return /*#__PURE__*/React.createElement("span", {
          key: i,
          className: classnames(['ghwp-fontawesome-picker__item', {
            'is-active': _icon && _icon.iconName === iconObject.definition.iconName
          }]),
          dangerouslySetInnerHTML: {
            __html: iconObject.html
          },
          onClick: function onClick() {
            onChange(iconObject.definition);

            _this4.hideList();
          }
        });
      }))));
    }
  }]);

  return FontAwesomePickerComponent;
}(Component);

var FontAwesomePicker = FontAwesomePickerComponent;

export { FontAwesomePicker };
//# sourceMappingURL=FontAwesomePicker.js.map
