import { components } from 'wp';
import classnames from 'classnames';

import { FontAwesomeIcon } from '../fontawesome/FontAwesomeIcon';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

const { Button } = components;

export const FocusButton = ({ isSelected, onClick = () => {} }) => (
    <Button
        className={classnames({
            'ghwp-editor-focus-button': true,
            'is-hidden': isSelected,
        })}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={faCog} />
    </Button>
);
