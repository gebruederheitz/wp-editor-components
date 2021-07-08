import classnames from 'classnames';
import { element } from 'wp';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash-es/debounce';

import { getFontAwesomeList } from './util';
import { CloseButton } from './components/CloseButton';
import { Controls } from './components/Controls';
import { FontAwesomeIcon } from './FontAwesomeIcon';

const { Component } = element;

class FontAwesomePickerComponent extends Component {
    constructor(props) {
        super(props);

        this.timer = null;

        this.onSearch = debounce(this.onSearch, 600).bind(this);

        this.hideList = this.hideList.bind(this);
        this.showList = this.showList.bind(this);
        this.toggleList = this.toggleList.bind(this);

        this.state = {
            listElementRendered: false,
            listElementVisible: false,
            isSearchActive: false,
            search: '',
            results: [],
            iconsByName: {},
            iconList: [],
        };
    }

    componentDidMount() {
        this.initIcons();
    }

    hideList() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({
            listElementVisible: false,
        });
        this.timer = setTimeout(() => {
            this.setState({
                listElementRendered: false,
            });
            this.timer = null;
        }, 1000);
    }

    initIcons() {
        const { iconsByName, list: iconList } = getFontAwesomeList();

        this.setState({
            iconsByName,
            iconList,
        });
    }

    isValidIcon(icon) {
        return Boolean(
            icon && icon.iconName && this.state.iconsByName[icon.iconName]
        );
    }

    onSearch(needle) {
        if (!needle) {
            this.setState({ isSearchActive: false, results: [] });
        } else {
            const regex = new RegExp(`${needle}`);
            const results = this.state.iconList.filter((iconObject) =>
                regex.test(iconObject.definition.iconName)
            );
            this.setState({ results, isSearchActive: true });
        }
    }

    showList() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({
            listElementRendered: true,
        });
        this.timer = setTimeout(() => {
            this.setState({
                listElementVisible: true,
            });
            this.timer = null;
        }, 50);
    }

    toggleList() {
        if (this.state.listElementRendered) {
            this.hideList();
        } else {
            this.showList();
        }
    }

    render() {
        const { icon = null, onChange = () => {} } = this.props;
        const {
            iconList,
            isSearchActive,
            listElementRendered,
            listElementVisible,
            results,
            search,
        } = this.state;

        const isValidIcon = this.isValidIcon(icon);
        const _icon = isValidIcon ? icon : faPalette;
        const listShown = isSearchActive ? results : iconList;

        return (
            <div className="ghwp-fontawesome-picker">
                <FontAwesomeIcon
                    className={classnames({
                        'ghwp-fontawesome-picker__button': !isValidIcon,
                        'ghwp-fontawesome-picker__icon': isValidIcon,
                        'is-active': listElementRendered,
                    })}
                    icon={_icon}
                    large
                    onClick={this.toggleList}
                />
                {listElementRendered && (
                    <div
                        className={classnames({
                            'ghwp-fontawesome-picker__popup': true,
                            'is-hidden': !listElementVisible,
                        })}
                    >
                        <Controls
                            value={search}
                            onChange={(search) => {
                                this.setState({ search });
                                this.onSearch(search);
                            }}
                            onClick={() => {
                                this.setState({
                                    results: [],
                                    search: '',
                                    isSearchActive: false,
                                });
                                this.hideList();
                                onChange(null);
                            }}
                        />
                        <CloseButton onClick={this.hideList} />
                        {/*                 ICONS LIST                       */}
                        <div className="ghwp-fontawesome-picker__list">
                            {listShown.map((iconObject, i) => (
                                <span
                                    key={i}
                                    className={classnames([
                                        'ghwp-fontawesome-picker__item',
                                        {
                                            'is-active':
                                                _icon &&
                                                _icon.iconName ===
                                                    iconObject.definition
                                                        .iconName,
                                        },
                                    ])}
                                    dangerouslySetInnerHTML={{
                                        __html: iconObject.html,
                                    }}
                                    onClick={() => {
                                        onChange(iconObject.definition);
                                        this.hideList();
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export const FontAwesomePicker = FontAwesomePickerComponent;
