import { components } from 'wp';
import classnames from 'classnames';
import { omitBy, pick } from 'lodash-es';

const { RangeControl, TextControl, ToggleControl } = components;

const toggleWithIconStyles = (highlighted) => {
    let styles = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        padding: '8px',
        border: '1px solid #ccc',
        justifyContent: 'space-between',
        width: '100%',
    };
    if (highlighted) {
        styles = Object.assign(styles, {
            borderColor: '#35f',
            borderWidth: '2px',
            boxShadow: '1px 1px 5px 0 #ddd',
        });
    }
    return styles;
};

const iconWrapperStyles = {
    paddingLeft: '8px',
    borderLeft: '1px solid #ccc',
    marginLeft: '8px',
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'stretch',
    flex: '0 0 40px',
};

const svgIconStyles = {
    width: '32px',
    height: '32px',
};

/**
 * A wrapper for various input components that puts them in a box with an icon.
 * In order to process changes, you will have to either provide the attribute's
 * name as a string along with the setAttributes function OR pass your own
 * onChange function.
 *
 * @param props
 * @param {Element|string} props.icon
 * @param {string}         props.label
 * @param {?function}      props.onChange
 * @param {?function}      props.setAttributes
 * @param {?string}        props.attributeName
 * @param {Element}        props.component
 * @param {boolean}        props.highlighted
 * @return {*}
 * @constructor
 */
export const InputWithIcon = (props) => {
    let {
        highlighted = false,
        icon: Icon,
        label,
        onChange,
        setAttributes,
        attributeName,
        component: Component = TextControl,
    } = props;

    let componentProps;
    switch (Component) {
        case 'toggle':
        case 'switch':
            Component = ToggleControl;
        // eslint-disable-next-line no-fallthrough
        case ToggleControl:
            componentProps = pick(props, ['checked']);
            break;
        case 'range':
            Component = RangeControl;
        // eslint-disable-next-line no-fallthrough
        case RangeControl:
            componentProps = pick(props, [
                // 'label',
                'help',
                'beforeIcon',
                'afterIcon',
                'allowReset',
                'disabled',
                'initialPosition',
                'isShiftStepEnabled',
                'marks',
                // 'onChange',
                'min',
                'max',
                'railColor',
                'renderTooltipContent',
                'resetFallbackValue',
                'showTooltip',
                'step',
                'trackColor',
                'value',
                'withInputField',
                'icon',
                'separatorType',
                'type',
                'shiftStep',
            ]);
            componentProps = omitBy(
                componentProps,
                (el) => el === null || typeof el === 'undefined'
            );
            break;
        case TextControl:
        default:
            componentProps = pick(props, [
                'type',
                'value',
                'max',
                'min',
                'step',
                'placeholder',
                'readonly',
            ]);
            break;
    }

    const defaultOnChange = (value) => {
        setAttributes({ [attributeName]: value });
    };
    const containerStyles = toggleWithIconStyles(highlighted);

    return (
        <>
            <style>
                {`
                .ghwp-editor-input-with-icon * {
                    margin-bottom: 0 !important;
                    align-items: center;
                }

                .ghwp-editor-input-with-icon .components-base-control__label {
                    display: block;
                    padding: 0 10px 5px 10px;
                    text-align: center;
                }

                .ghwp-editor-input-with-icon--highlight {
                     border-color: #35f;
                     border-width: 2px;
                     box-shadow: 1px 1px 5px 0 #ddd;
                }
            `}
            </style>
            <div
                className={classnames('ghwp-editor-input-with-icon', {
                    'ghwp-editor-input-with-icon': highlighted,
                })}
                style={containerStyles}
            >
                <Component
                    label={label}
                    onChange={onChange || defaultOnChange}
                    {...componentProps}
                />
                <div style={iconWrapperStyles}>
                    <Icon style={svgIconStyles} />
                </div>
            </div>
        </>
    );
};
