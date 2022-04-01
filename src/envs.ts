export const GMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

// London/UK center coordinates
export const center = { lat: 51.509865, lng: -0.118092 };

// Create a bounding box with sides ~30km away from the center point
export const defaultBounds = {
    north: center.lat + 0.3,
    south: center.lat - 0.3,
    east: center.lng + 0.3,
    west: center.lng - 0.3,
};

// Autocomplete settings -> only search business locations, set the boundaries strictly to London/UK (doesn't seem to work properly though)
export const autoComplete: google.maps.places.AutocompleteOptions = {
    bounds: defaultBounds,
    strictBounds: true,
    types: ['establishment'],
};
