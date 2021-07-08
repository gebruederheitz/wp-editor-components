import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

export const CloseButton = ({ onClick }) => {
    return (
        <div className="ghwp-fontawesome-picker__close" onClick={onClick}>
            <FontAwesomeIcon icon={faTimes} xl />
        </div>
    );
};
