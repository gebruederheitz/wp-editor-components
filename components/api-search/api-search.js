import classnames from 'classnames';
import debounce from 'lodash-es/debounce';
import { components, i18n } from 'wp';

const { TextControl } = components;
const { __ } = i18n;

/**
 * Flexible component for rendering a text search input and result suggestions
 * as a list. You have to provide the search logic yourself.
 *
 * @param className
 * @param label
 * @param onSearch
 * @param onSelectResult
 * @param results
 * @param resultDisplay
 * @return {*}
 * @constructor
 */
export const ApiSearch = ({
    className = '',
    label = 'Search',
    onSearch,
    onSelectResult,
    results = null,
    resultDisplay,
}) => {
    const resultsVisible = !!results && results.length;
    const hasResults = !!results && Array.isArray(results) && results.length;
    const onSearchDebounced = debounce(onSearch, 700);

    return (
        <div className={classnames('ghwp-editor-search', className)}>
            <div className="ghwp-editor-search__input">
                <TextControl
                    type="search"
                    label={label}
                    placeholder={__('Start typing...', 'ghwp')}
                    onChange={(search) => {
                        onSearchDebounced(search);
                    }}
                />
            </div>
            <div
                className={classnames('ghwp-editor-search__results', {
                    'ghwp-editor-search__results--active': resultsVisible,
                })}
            >
                <ul>
                    {hasResults ? (
                        results.map((result, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    onSelectResult(result);
                                }}
                            >
                                {resultDisplay(result)}
                            </li>
                        ))
                    ) : (
                        <li>{results}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
