import { fas as Fontawesome } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

/**
 * @return {{iconsByName: {}, list: string[]}}
 */
export const getFontAwesomeList = () => {
    const iconsByName = {};
    Object.values(Fontawesome).forEach((iconDefinition) => {
        iconsByName[iconDefinition.iconName] = {
            html: icon(iconDefinition).html,
            definition: iconDefinition,
        };
    });
    const list = Object.values(iconsByName);
    return {
        iconsByName,
        list,
    };
};
