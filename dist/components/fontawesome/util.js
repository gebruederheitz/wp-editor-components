import { fas as _iconsCache } from '../../node_modules/@fortawesome/free-solid-svg-icons/index.es.js';
import { icon } from '../../node_modules/@fortawesome/fontawesome-svg-core/index.es.js';

/**
 * @return {{iconsByName: {}, list: string[]}}
 */

var getFontAwesomeList = function getFontAwesomeList() {
  var iconsByName = {};
  Object.values(_iconsCache).forEach(function (iconDefinition) {
    iconsByName[iconDefinition.iconName] = {
      html: icon(iconDefinition).html,
      definition: iconDefinition
    };
  });
  var list = Object.values(iconsByName);
  return {
    iconsByName: iconsByName,
    list: list
  };
};

export { getFontAwesomeList };
//# sourceMappingURL=util.js.map
