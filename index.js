import * as components from './components';
import * as icons from './icons/material-design-icons';
import * as utils from './utils';

const {
    AddIconButton,
    ApiSearch,
    DiscreetInput,
    FocusButton,
    FontAwesomeIcon,
    FontAwesomePicker,
    ImageSelect,
    InputWithIcon,
    Modal,
    SpinnerOverlay,
    WithBlockInserters,
    WithControlledChildren,
    WithFocusWithin,
} = components;

const {
    getCurrentVisibleChild,
    getIconToggles,
    hasSelectedInnerBlock,
    lazyLoadImages,
    registerAdditionalStyles,
    truncateString,
    videoProviderUtils,
} = utils;

export {
    /* categories as packs */
    components,
    icons,
    utils,
    /* single components */
    AddIconButton,
    ApiSearch,
    DiscreetInput,
    FocusButton,
    FontAwesomeIcon,
    FontAwesomePicker,
    ImageSelect,
    InputWithIcon,
    Modal,
    SpinnerOverlay,
    WithBlockInserters,
    WithControlledChildren,
    WithFocusWithin,
    /* single utils */
    getCurrentVisibleChild,
    getIconToggles,
    hasSelectedInnerBlock,
    lazyLoadImages,
    registerAdditionalStyles,
    truncateString,
    videoProviderUtils,
};
