import classnames from '../../node_modules/classnames/index.js';
import debounce from '../../node_modules/lodash-es/debounce.js';
import { components, i18n } from 'wp';

var TextControl = components.TextControl;
var __ = i18n.__;
/**
 * Flexible component for rendering a text search input and result suggestions
 * as a list. You have to provide the search logic yourself.
 *
 * @param className
 * @param label
 * @param onSearch
 * @param onSelectResult
 * @param results
 * @param resultDisplay
 * @return {*}
 * @constructor
 */

var ApiSearch = function ApiSearch(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Search' : _ref$label,
      onSearch = _ref.onSearch,
      onSelectResult = _ref.onSelectResult,
      _ref$results = _ref.results,
      results = _ref$results === void 0 ? null : _ref$results,
      resultDisplay = _ref.resultDisplay;
  var resultsVisible = !!results && results.length;
  var hasResults = !!results && Array.isArray(results) && results.length;
  var onSearchDebounced = debounce(onSearch, 700);
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-editor-search', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-search__input"
  }, /*#__PURE__*/React.createElement(TextControl, {
    type: "search",
    label: label,
    placeholder: __('Start typing...', 'ghwp'),
    onChange: function onChange(search) {
      onSearchDebounced(search);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-editor-search__results', {
      'ghwp-editor-search__results--active': resultsVisible
    })
  }, /*#__PURE__*/React.createElement("ul", null, hasResults ? results.map(function (result, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      onClick: function onClick() {
        onSelectResult(result);
      }
    }, resultDisplay(result));
  }) : /*#__PURE__*/React.createElement("li", null, results))));
};

export { ApiSearch };
//# sourceMappingURL=api-search.js.map
