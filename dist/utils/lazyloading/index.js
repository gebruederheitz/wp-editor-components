import { objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { element, hooks } from 'wp';

var cloneElement = element.cloneElement,
    mapChildren = element.Children.map;
var addFilter = hooks.addFilter;
var processedBlockTypes = ['core/image' // 'core/embed',
// 'core-embed/twitter',
// 'core-embed/youtube',
// 'core-embed/instagram',
// 'core-embed/vimeo',
];

var initLazyload = function initLazyload(element, blockType) {
  if (processedBlockTypes.findIndex(function (el) {
    return el === blockType.name;
  }) > -1) {
    var newChildren = mapChildren(element.props.children, recurseChildren);

    var newProps = _objectSpread2(_objectSpread2({}, element.props), {}, {
      children: newChildren
    });

    return cloneElement(element, newProps);
  } else {
    return element;
  }
};

var recurseChildren = function recurseChildren(child) {
  if (!child) return;

  if (child.type === 'img' || child.type === 'iframe') {
    return cloneElement(child, {
      loading: 'lazy'
    });
  } else if (child.props && child.props.children) {
    return cloneElement(child, {
      children: mapChildren(child.props.children, recurseChildren)
    });
  }

  return child;
};

function lazyLoadImages() {
  addFilter('blocks.getSaveElement', 'ghwp/lazyloading', initLazyload);
}

export { lazyLoadImages };
//# sourceMappingURL=index.js.map
