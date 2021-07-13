import { defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { compose as compose$1, data } from 'wp';
import classnames from '../../node_modules/classnames/dedupe.js';

var compose = compose$1.compose;
var withDispatch = data.withDispatch,
    withSelect = data.withSelect;
var INACTIVE_CHILD_CLASS = 'ghwp-inactive-child';
/**
 * A higher order component that allows fine-grained control over dependent children
 *
 * @param component
 * @return {*}
 * @constructor
 */

var WithControlledChildren = function WithControlledChildren(component) {
  return compose([withSelect(function (select, ownProps) {
    var blockEditorSelect = select('core/block-editor');
    var getBlock = blockEditorSelect.getBlock;
    var clientId = ownProps.clientId;
    var innerBlocks = getBlock(clientId).innerBlocks;
    return {
      children: innerBlocks
    };
  }), withDispatch(function (dispatch, ownProps, _ref) {
    var select = _ref.select;

    var _dispatch = dispatch('core/block-editor'),
        insertBlock = _dispatch.insertBlock,
        moveBlockToPosition = _dispatch.moveBlockToPosition,
        removeBlock = _dispatch.removeBlock,
        removeBlocks = _dispatch.removeBlocks,
        selectBlock = _dispatch.selectBlock,
        updateBlockAttributes = _dispatch.updateBlockAttributes; // prettier-ignore


    var _select = select('core/block-editor'),
        getBlock = _select.getBlock,
        getBlockIndex = _select.getBlockIndex,
        getAdjacentBlockClientId = _select.getAdjacentBlockClientId;

    var currentlyEditedChildIndex = ownProps.attributes.currentlyEditedChildIndex,
        clientId = ownProps.clientId,
        setAttributes = ownProps.setAttributes;
    var block = getBlock(clientId);

    var getCurrentlyEditedChildClientId = function getCurrentlyEditedChildClientId() {
      var index = currentlyEditedChildIndex !== null && typeof currentlyEditedChildIndex !== 'undefined' ? currentlyEditedChildIndex : 0;
      return block.innerBlocks[index] ? block.innerBlocks[currentlyEditedChildIndex].clientId : null;
    };

    var setCurrentlyEditedChildIndex = function setCurrentlyEditedChildIndex(_ref2) {
      var childClientId = _ref2.clientId;
      var childIndex = childClientId ? getBlockIndex(childClientId, clientId) : 0;
      block.innerBlocks.forEach(function (child, index) {
        var isVisible = false;
        if (index === childIndex) isVisible = true;
        var className = child.attributes.className;
        updateBlockAttributes(child.clientId, {
          isVisible: isVisible,
          className: classnames(className, _defineProperty({}, INACTIVE_CHILD_CLASS, !isVisible))
        });
      });
      setAttributes({
        currentlyEditedChildIndex: childIndex
      });
    };

    var selectNextChild = function selectNextChild() {
      if (currentlyEditedChildIndex === block.innerBlocks.length - 1) {
        return false;
      }

      var newBlockClientId = getAdjacentBlockClientId(getCurrentlyEditedChildClientId(), 1);
      setCurrentlyEditedChildIndex({
        clientId: newBlockClientId
      });
      return true;
    };

    var selectPreviousChild = function selectPreviousChild() {
      if (currentlyEditedChildIndex === 0) return false;
      var newBlockClientId = getAdjacentBlockClientId(getCurrentlyEditedChildClientId(), -1);
      setCurrentlyEditedChildIndex({
        clientId: newBlockClientId
      });
      return true;
    };

    var updateChildrenRecord = function updateChildrenRecord() {
      setAttributes({
        children: getBlock(clientId).innerBlocks
      });
    };

    return {
      insertChild: function insertChild(newBlock) {
        insertBlock(newBlock, parseInt(block.innerBlocks.length, 10), clientId, false // do not update the selection and "steal focus"
        );
        updateChildrenRecord();
        setCurrentlyEditedChildIndex(newBlock);
        selectBlock(newBlock.clientId);
      },
      deleteChild: function deleteChild(child) {
        if (!selectPreviousChild()) {
          selectNextChild();
        }

        removeBlock(child.clientId, true);
        updateChildrenRecord();
      },
      moveChild: function moveChild(child) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'up';
        var childId = child.clientId;
        var currentPosition = childId && getBlockIndex(childId, clientId);
        var isFirstGoingUp = currentPosition === 0 && direction === 'up';
        var isLastGoingDown = currentPosition + 1 === block.innerBlocks.length && direction === 'down';
        var isPositionInvalid = currentPosition < 0 || currentPosition === null || typeof currentPosition === 'undefined';
        if (!childId || isPositionInvalid || isFirstGoingUp || isLastGoingDown) return;
        var newIndex = direction === 'up' ? currentPosition - 1 : currentPosition + 1;
        moveBlockToPosition(childId, clientId, clientId, newIndex);
        updateChildrenRecord();
      },

      /* expose a way to edit a child's attributes */
      updateBlockAttributes: updateBlockAttributes,
      removeBlocks: removeBlocks,
      setCurrentlyEditedChild: setCurrentlyEditedChildIndex,
      selectNextChild: selectNextChild,
      selectPreviousChild: selectPreviousChild,

      /* Utility function for when data from children needs to used
       * to render parts of the parent component (in the save function)
       * → see tabsBlock > TabHeader
       *
       * Needs to be called separately after each dispatch call that
       * involves modifying the nested tab components; calling
       * setAttributes from inside the individual dispatch functions does
       * not seem to work reliably
       */
      updateChildrenRecord: updateChildrenRecord
    };
  })])(component);
};

export { WithControlledChildren };
//# sourceMappingURL=index.js.map
