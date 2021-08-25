import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
import { Result } from 'postcss';

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map(item => ({
        latitude: item.lat,
        longitude: item.long
    }))
    const center = getCenter(coordinates);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11 
    });
    return (
        <ReactMapGL
        mapStyle="mapbox://styles/schen7239/cksl70gksl1ro17p6yizllkcv"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport)=>setViewport(nextViewport)}
        >
        {searchResults.map(item => (
            <div key={item.long}>
            <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetTop={-20}
            offsetLeft={-15}>
            <p onClick={()=>setSelectedLocation(item)}className="cursor-pointer text-2xl animate-bounce">📍</p>
            </Marker>
            {selectedLocation.long === item.long ? (
                <Popup closeOnClick={true}
                onClose={() =>setSelectedLocation('')}
                latitude={item.lat}
                longitude={item.long}
                >{item.title}</Popup>
            ):(
                false
            )}
            </div>
        ))}
        </ReactMapGL>
    )
}

export default Map
