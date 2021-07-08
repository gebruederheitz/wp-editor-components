export const hasSelectedInnerBlock = (editorSelect, blockClientId) => {
    const { getBlock, getBlockSelectionStart } = editorSelect;

    const selected = getBlockSelectionStart();
    const inner = getBlock(blockClientId).innerBlocks;
    for (let i = 0; i < inner.length; i++) {
        if (
            inner[i].clientId === selected ||
            (inner[i].innerBlocks.length &&
                hasSelectedInnerBlock(editorSelect, inner[i].clientId))
        ) {
            return true;
        }
    }
    return false;
};
