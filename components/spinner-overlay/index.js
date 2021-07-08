import { components } from 'wp';

const { Spinner } = components;

export const SpinnerOverlay = () => (
    <div className="ghwp-editor-spinner-overlay">
        <Spinner />
    </div>
);
