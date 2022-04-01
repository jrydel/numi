import React from 'react';

/**
 * Map component
 * @param props
 * @returns
 */
const Map: React.FC<google.maps.MapOptions> = (props) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, { ...props }));
        }
    }, [ref, map, props]);

    return (
        <div className="w-full h-full" ref={ref} id="map">
            {React.Children.map(props.children, (child) => {
                // this is required for correct ref passing to map markers
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map });
                }
                return null;
            })}
        </div>
    );
};

export default Map;
