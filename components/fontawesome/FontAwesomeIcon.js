import classnames from 'classnames';
import { icon } from '@fortawesome/fontawesome-svg-core';

/**
 * Render a fontawesome icon as a React element
 *
 * @param {any}     iconDefinition  The SVG icon from @fortawesome/free-solid-svg-icons
 * @param {boolean} large           render large icon
 * @param {boolean} xl              render extra-large icon
 * @param {boolean} xxl             render huge icon
 * @param {boolean} small           render a small icon
 * @param {string}  className       Pass custom CSS classes to the element
 * @param {boolean} raw             Skip passing the default "ghwp-fa-icon" class
 * @param props
 * @return {*}
 * @constructor
 */
export const FontAwesomeIcon = ({
    icon: iconDefinition,
    large = false,
    xl = false,
    xxl = false,
    small = false,
    className = '',
    raw = false,
    ...props
}) => {
    if (iconDefinition) {
        return (
            <span
                className={classnames([
                    className,
                    {
                        'ghwp-fa-icon': !raw,
                        'ghwp-fa-large': large === true,
                        'ghwp-fa-larger': xl === true,
                        'ghwp-fa-largest': xxl === true,
                        'ghwp-fa-small': small === true,
                    },
                ])}
                dangerouslySetInnerHTML={{
                    __html: icon(iconDefinition).html.pop(),
                }}
                {...props}
            />
        );
    }
};
