import { data } from 'wp';

const { withDispatch } = data;

export const WithBlockInserters = (Component) =>
    withDispatch((dispatch, ownProps, { select }) => {
        const { clientId } = ownProps;
        const { insertBlock } = dispatch('core/block-editor');
        // prettier-ignore
        const { getBlockIndex, getBlockRootClientId } = select(
            'core/block-editor'
        );

        const mother = getBlockRootClientId(clientId);
        const currentIndex = getBlockIndex(clientId, mother);

        return {
            insertBlockAfterSelf(block) {
                insertBlock(block, currentIndex + 1, mother, false);
            },
            insertBlockInto(block, parent, position = null) {
                insertBlock(block, position, parent.clientId, false);
            },
        };
    })(Component);
