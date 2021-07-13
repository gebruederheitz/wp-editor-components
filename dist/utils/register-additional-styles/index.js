import { blocks, i18n } from 'wp';

var registerBlockStyle = blocks.registerBlockStyle;
var __ = i18n.__;
function registerAdditionalStyles(blockName, styles) {
  styles.forEach(function (style) {
    registerBlockStyle(blockName, {
      name: style.name,
      label: __(style.label, 'ghwp')
    });
  });
}

export { registerAdditionalStyles };
//# sourceMappingURL=index.js.map
