import { data } from 'wp';

var withDispatch = data.withDispatch;
var WithBlockInserters = function WithBlockInserters(Component) {
  return withDispatch(function (dispatch, ownProps, _ref) {
    var select = _ref.select;
    var clientId = ownProps.clientId;

    var _dispatch = dispatch('core/block-editor'),
        insertBlock = _dispatch.insertBlock; // prettier-ignore


    var _select = select('core/block-editor'),
        getBlockIndex = _select.getBlockIndex,
        getBlockRootClientId = _select.getBlockRootClientId;

    var mother = getBlockRootClientId(clientId);
    var currentIndex = getBlockIndex(clientId, mother);
    return {
      insertBlockAfterSelf: function insertBlockAfterSelf(block) {
        insertBlock(block, currentIndex + 1, mother, false);
      },
      insertBlockInto: function insertBlockInto(block, parent) {
        var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        insertBlock(block, position, parent.clientId, false);
      }
    };
  })(Component);
};

export { WithBlockInserters };
//# sourceMappingURL=index.js.map
