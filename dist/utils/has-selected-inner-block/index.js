var hasSelectedInnerBlock = function hasSelectedInnerBlock(editorSelect, blockClientId) {
  var getBlock = editorSelect.getBlock,
      getBlockSelectionStart = editorSelect.getBlockSelectionStart;
  var selected = getBlockSelectionStart();
  var inner = getBlock(blockClientId).innerBlocks;

  for (var i = 0; i < inner.length; i++) {
    if (inner[i].clientId === selected || inner[i].innerBlocks.length && hasSelectedInnerBlock(editorSelect, inner[i].clientId)) {
      return true;
    }
  }

  return false;
};

export { hasSelectedInnerBlock };
//# sourceMappingURL=index.js.map
