import { components, compose as wpCompose } from 'wp';

const { Button, Icon, ToolbarButton } = components;
const { compose, withState } = wpCompose;

export const Modal = ({ onClose, children, id }) => (
    <div className={'ghwp-editor-modal__content'} data-ghwp-modal-id={id}>
        <div className="ghwp-editor-modal__close" onClick={onClose}>
            <Icon icon="no" />
        </div>
        {children}
    </div>
);

export const ControlledModal = (props) => {
    const { id = '', children, setState } = props;
    const isVisible = props[`modalVisible${id}`];

    return (
        <>
            {isVisible && (
                <Modal
                    id={id}
                    onClose={() => {
                        setState({ [`modalVisible${id}`]: false });
                    }}
                >
                    {children}
                </Modal>
            )}
        </>
    );
};

export const WithModal = (Component, ids = ['']) => {
    const defaultState = {};
    ids.forEach((id) => {
        defaultState[`modalVisible${id}`] = false;
    });

    return compose([withState(defaultState)])(Component);
};

export const ModalOpener = (props) => {
    const { id = '', children, setState, toolbar = false, icon = null } = props;

    function onClick() {
        setState({ [`modalVisible${id}`]: true });
    }

    return (
        <>
            {toolbar ? (
                <ToolbarButton onClick={onClick}>
                    {icon ? <Icon icon={icon} /> : { children }}
                </ToolbarButton>
            ) : (
                <Button isPrimary onClick={onClick}>
                    {children}
                </Button>
            )}
        </>
    );
};
