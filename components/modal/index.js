import { components } from 'wp';

const { Icon } = components;

export const Modal = ({ onClose, children }) => (
    <div className={'ghwp-editor-modal__content'}>
        <div className="ghwp-editor-modal__close" onClick={onClose}>
            <Icon icon="no" />
        </div>
        {children}
    </div>
);
