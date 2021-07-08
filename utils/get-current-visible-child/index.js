export const getCurrentVisibleChild = (innerBlocks) => {
    return (
        innerBlocks
            .filter((child) => child.attributes.isVisible === true)
            .shift() || null
    );
};
