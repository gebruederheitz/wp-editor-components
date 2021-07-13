import { data } from 'wp';
import '../../utils/get-icon-toggles/index.js';
import { hasSelectedInnerBlock } from '../../utils/has-selected-inner-block/index.js';
import '../../utils/lazyloading/index.js';
import '../../utils/register-additional-styles/index.js';
import '../../utils/video-provider-utilities/index.js';

var withSelect = data.withSelect;
var WithFocusWithin = function WithFocusWithin(Component) {
  return withSelect(function (select, ownProps) {
    var clientId = ownProps.clientId;
    return {
      focusWithin: hasSelectedInnerBlock(select('core/block-editor'), clientId)
    };
  })(Component);
};

export { WithFocusWithin };
//# sourceMappingURL=index.js.map
