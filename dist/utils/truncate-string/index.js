import truncate from '../../node_modules/lodash-es/truncate.js';

var DEFAULT_TRUNCATED_STRING_LENGTH = 100;
var truncateString = function truncateString(string) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$length = options.length,
      length = _options$length === void 0 ? DEFAULT_TRUNCATED_STRING_LENGTH : _options$length,
      _options$omission = options.omission,
      omission = _options$omission === void 0 ? '...' : _options$omission,
      _options$separator = options.separator,
      separator = _options$separator === void 0 ? ' ' : _options$separator;
  return truncate(string, {
    length: length,
    omission: omission,
    separator: separator
  });
};

export { DEFAULT_TRUNCATED_STRING_LENGTH, truncateString };
//# sourceMappingURL=index.js.map
