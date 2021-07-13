var getCurrentVisibleChild = function getCurrentVisibleChild(innerBlocks) {
  return innerBlocks.filter(function (child) {
    return child.attributes.isVisible === true;
  }).shift() || null;
};

export { getCurrentVisibleChild };
//# sourceMappingURL=index.js.map
