import React from 'react';
import { Suggestion, Suggestions } from 'use-places-autocomplete';

/**
 * Search param props
 */
export interface SearchProps {
    query: string;
    handleChange: (value: string) => void;
    onHover: (suggestion: Suggestion) => void;
    suggestions: Suggestions;
}

/**
 * Search component
 * @param props
 * @returns
 */
const Search: React.FC<SearchProps> = ({ query, handleChange, onHover, suggestions }) => {
    return (
        <div className="absolute z-50 flex flex-col w-full p-4 font-thin divide-y sm:w-96 max-h-64 md:max-h-1/2">
            <input
                type="search"
                placeholder="Search restaurants, bars ..."
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full px-4 py-3 duration-100 shadow focus:outline-none focus:shadow-lg focus:shadow-slate-200 shadow-gray-100"
            />
            {suggestions.data.length > 0 && (
                <div className="flex-col overflow-y-auto bg-white w-fullflex">
                    {suggestions.data.map((item, key) => (
                        <div
                            key={key}
                            className="flex flex-col px-4 py-2 space-y-1 cursor-pointer hover:bg-blue-50"
                            onMouseOver={(e) => onHover(item)}
                        >
                            <span className="font-medium">{item.structured_formatting.main_text}</span>
                            <span className="text-xs">{item.structured_formatting.secondary_text}</span>

                            <div className="flex flex-wrap space-x-1">
                                {item.types.slice(0, 2).map((item2, key2) => (
                                    <span
                                        key={`badge-${key}-${key2}`}
                                        className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-indigo-200 dark:text-indigo-900"
                                    >
                                        {item2}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
