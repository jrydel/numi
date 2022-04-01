import React from 'react';
import usePlacesAutocomplete, { getDetails, Suggestion, Suggestions } from 'use-places-autocomplete';
import { autoComplete } from 'envs';

/**
 * Hook for requesting Google place API. Requires Google Maps script initialized.
 * @param param0
 * @returns
 */
export const useQuery = ({ google }: { google: any }) => {
    const { init, suggestions, clearSuggestions, value, setValue } = usePlacesAutocomplete({
        initOnMount: false,
        googleMaps: google,
        requestOptions: autoComplete,
        // delay between searches
        debounce: 300,
    });

    // we need to init autocomplete hook after Google maps script is initialized
    React.useEffect(() => {
        if (google) {
            init();
        }
    }, [google, init]);

    return { value, setValue, suggestions, clearSuggestions };
};

export type SuggestionWithCoordinates = Suggestion & { location: google.maps.LatLng | undefined };

/**
 * Hook for retrieving coordinates for search results.
 * @param param0
 * @returns
 */
export const useCoordinates = ({ suggestions }: { suggestions: Suggestions }) => {
    const [values, setValues] = React.useState<SuggestionWithCoordinates[]>([]);

    React.useEffect(() => {
        // get coordinates for autocomplete search results
        const getLatLng = async () => {
            const temp: SuggestionWithCoordinates[] = [];
            for await (const item of suggestions.data) {
                try {
                    const detail = (await getDetails({
                        placeId: item.place_id,
                        fields: ['geometry'],
                    })) as google.maps.places.PlaceResult;
                    temp.push({ ...item, location: detail.geometry?.location });
                } catch (err) {
                    console.error(err);
                }
            }
            setValues(temp);
        };

        if (suggestions.data.length > 0) {
            getLatLng();
        } else {
            setValues([]);
        }
    }, [suggestions]);

    return { values };
};
