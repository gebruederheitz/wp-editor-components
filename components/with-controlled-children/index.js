import { compose as wpCompose, data } from 'wp';
import classnames from 'classnames/dedupe';

const { compose } = wpCompose;
const { withDispatch, withSelect } = data;

const INACTIVE_CHILD_CLASS = 'ghwp-inactive-child';

/**
 * A higher order component that allows fine-grained control over dependent children
 *
 * @param component
 * @return {*}
 * @constructor
 */
export const WithControlledChildren = (component) =>
    compose([
        withSelect((select, ownProps) => {
            const blockEditorSelect = select('core/block-editor');
            const { getBlock } = blockEditorSelect;
            const { clientId } = ownProps;

            const innerBlocks = getBlock(clientId).innerBlocks;

            return {
                children: innerBlocks,
            };
        }),
        withDispatch((dispatch, ownProps, { select }) => {
            const {
                insertBlock,
                moveBlockToPosition,
                removeBlock,
                removeBlocks,
                selectBlock,
                updateBlockAttributes,
            } = dispatch('core/block-editor');
            // prettier-ignore
            const {
                getBlock,
                getBlockIndex,
                getAdjacentBlockClientId,
            } = select('core/block-editor');

            const {
                attributes: { currentlyEditedChildIndex },
                clientId,
                setAttributes,
            } = ownProps;

            const block = getBlock(clientId);

            const getCurrentlyEditedChildClientId = () => {
                const index =
                    currentlyEditedChildIndex !== null &&
                    typeof currentlyEditedChildIndex !== 'undefined'
                        ? currentlyEditedChildIndex
                        : 0;
                return block.innerBlocks[index]
                    ? block.innerBlocks[currentlyEditedChildIndex].clientId
                    : null;
            };

            const setCurrentlyEditedChildIndex = ({
                clientId: childClientId,
            }) => {
                const childIndex = childClientId
                    ? getBlockIndex(childClientId, clientId)
                    : 0;
                block.innerBlocks.forEach((child, index) => {
                    let isVisible = false;
                    if (index === childIndex) isVisible = true;
                    const className = child.attributes.className;
                    updateBlockAttributes(child.clientId, {
                        isVisible,
                        className: classnames(className, {
                            [INACTIVE_CHILD_CLASS]: !isVisible,
                        }),
                    });
                });
                setAttributes({
                    currentlyEditedChildIndex: childIndex,
                });
            };

            const selectNextChild = () => {
                if (
                    currentlyEditedChildIndex ===
                    block.innerBlocks.length - 1
                ) {
                    return false;
                }

                const newBlockClientId = getAdjacentBlockClientId(
                    getCurrentlyEditedChildClientId(),
                    1
                );
                setCurrentlyEditedChildIndex({ clientId: newBlockClientId });
                return true;
            };

            const selectPreviousChild = () => {
                if (currentlyEditedChildIndex === 0) return false;
                const newBlockClientId = getAdjacentBlockClientId(
                    getCurrentlyEditedChildClientId(),
                    -1
                );
                setCurrentlyEditedChildIndex({ clientId: newBlockClientId });
                return true;
            };

            const updateChildrenRecord = () => {
                setAttributes({
                    children: getBlock(clientId).innerBlocks,
                });
            };

            return {
                insertChild(newBlock) {
                    insertBlock(
                        newBlock,
                        parseInt(block.innerBlocks.length, 10),
                        clientId,
                        false // do not update the selection and "steal focus"
                    );
                    updateChildrenRecord();
                    setCurrentlyEditedChildIndex(newBlock);
                    selectBlock(newBlock.clientId);
                },
                deleteChild(child) {
                    if (!selectPreviousChild()) {
                        selectNextChild();
                    }
                    removeBlock(child.clientId, true);
                    updateChildrenRecord();
                },
                moveChild(child, direction = 'up') {
                    const childId = child.clientId;
                    const currentPosition =
                        childId && getBlockIndex(childId, clientId);
                    const isFirstGoingUp =
                        currentPosition === 0 && direction === 'up';
                    const isLastGoingDown =
                        currentPosition + 1 === block.innerBlocks.length &&
                        direction === 'down';
                    const isPositionInvalid =
                        currentPosition < 0 ||
                        currentPosition === null ||
                        typeof currentPosition === 'undefined';

                    if (
                        !childId ||
                        isPositionInvalid ||
                        isFirstGoingUp ||
                        isLastGoingDown
                    )
                        return;
                    const newIndex =
                        direction === 'up'
                            ? currentPosition - 1
                            : currentPosition + 1;
                    moveBlockToPosition(childId, clientId, clientId, newIndex);
                    updateChildrenRecord();
                },
                /* expose a way to edit a child's attributes */
                updateBlockAttributes,
                removeBlocks,
                setCurrentlyEditedChild: setCurrentlyEditedChildIndex,
                selectNextChild,
                selectPreviousChild,
                /* Utility function for when data from children needs to used
                 * to render parts of the parent component (in the save function)
                 * → see tabsBlock > TabHeader
                 *
                 * Needs to be called separately after each dispatch call that
                 * involves modifying the nested tab components; calling
                 * setAttributes from inside the individual dispatch functions does
                 * not seem to work reliably
                 */
                updateChildrenRecord,
            };
        }),
    ])(component);
