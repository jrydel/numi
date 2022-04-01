import React, { ReactElement } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Suggestion } from 'use-places-autocomplete';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { center, GMapsApiKey } from 'envs';
import { useCoordinates, useQuery } from 'hooks/useQuery';
import Search from 'components/Search';
import Marker from 'components/Marker';
import Map from 'components/Map';

const App: React.FC = () => {
    const { value, setValue, suggestions, clearSuggestions } = useQuery({ google: window.google });
    // get coordinates from search results
    const { values } = useCoordinates({ suggestions });

    const [hoveredSuggestion, setHoveredSuggestion] = React.useState<Suggestion>();

    const handleSuggestionHover = (suggestion: Suggestion) => {
        setHoveredSuggestion(suggestion);
    };

    const handleQueryChange = (value: string) => {
        const length = value.trim().length;
        // avoid requesting if input is blank
        setValue(value, length > 0);
        // clear suggestions if input is empty
        if (length === 0) {
            clearSuggestions();
        } else {
            // show toast only if there is a new search
            toast(`${suggestions.data.length} results found for query: ${value}`);
        }
    };

    return (
        <div className="relative w-full h-screen">
            <Search query={value} handleChange={handleQueryChange} onHover={handleSuggestionHover} suggestions={suggestions} />
            <Map disableDefaultUI={true} center={center} zoom={10}>
                {values.map((item, key) => {
                    const hovered = hoveredSuggestion?.place_id === item.place_id;
                    return (
                        <Marker
                            key={key}
                            position={item.location}
                            icon={`http://maps.google.com/mapfiles/ms/icons/${hovered ? 'purple' : 'red'}-dot.png`}
                        />
                    );
                })}
            </Map>
        </div>
    );
};

const AppWrapper: React.FC = () => {
    const render = (status: Status): ReactElement => {
        if (status === Status.LOADING || status === Status.FAILURE) return <div>{status}</div>;
        return <App />;
    };

    return (
        <>
            <Wrapper apiKey={GMapsApiKey} libraries={['places']} render={render} />
            <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick />
        </>
    );
};

export default AppWrapper;
