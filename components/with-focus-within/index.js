import { data } from 'wp';

import { hasSelectedInnerBlock } from '../../utils';

const { withSelect } = data;

export const WithFocusWithin = (Component) =>
    withSelect((select, ownProps) => {
        const { clientId } = ownProps;

        return {
            focusWithin: hasSelectedInnerBlock(
                select('core/block-editor'),
                clientId
            ),
        };
    })(Component);
