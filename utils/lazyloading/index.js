import { element, hooks } from 'wp';

const {
    cloneElement,
    Children: { map: mapChildren },
} = element;
const { addFilter } = hooks;

const processedBlockTypes = [
    'core/image',
    // 'core/embed',
    // 'core-embed/twitter',
    // 'core-embed/youtube',
    // 'core-embed/instagram',
    // 'core-embed/vimeo',
];

const initLazyload = function (element, blockType) {
    if (processedBlockTypes.findIndex((el) => el === blockType.name) > -1) {
        const newChildren = mapChildren(
            element.props.children,
            recurseChildren
        );
        const newProps = {
            ...element.props,
            children: newChildren,
        };

        return cloneElement(element, newProps);
    } else {
        return element;
    }
};

const recurseChildren = (child) => {
    if (!child) return;
    if (child.type === 'img' || child.type === 'iframe') {
        return cloneElement(child, {
            loading: 'lazy',
        });
    } else if (child.props && child.props.children) {
        return cloneElement(child, {
            children: mapChildren(child.props.children, recurseChildren),
        });
    }
    return child;
};

export function lazyLoadImages() {
    addFilter('blocks.getSaveElement', 'ghwp/lazyloading', initLazyload);
}
