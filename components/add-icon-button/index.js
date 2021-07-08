import classnames from 'classnames';
import { components } from 'wp';

import { Add as PlusIcon } from '../../icons/material-design-icons';

const { Button } = components;

export const AddIconButton = ({ className, onClick }) => (
    <Button
        className={classnames([className, 'components-icon-button'])}
        isPrimary
        onClick={onClick}
    >
        <PlusIcon width={16} height={16} color={'#fff'} />
    </Button>
);
