import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export const Map = ({ locations }) => {
  const mapRef = useRef();
  // console.log(locations);
  useEffect(() => {
    if (locations.length > 0) {
      // console.log(locations);
      mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

      var map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
      });
      // this bound will be displayed in the map
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((el) => {
        // marker
        new mapboxgl.Marker({
          anchor: 'bottom',
          color: '#17a2b8',
        })
          .setLngLat(el.coordinates)
          .addTo(map);
        // popup
        new mapboxgl.Popup({
          anchor: 'top',
          offset: -5,
        })
          .setLngLat(el.coordinates)
          .setHTML(
            `
      <p> Day ${el.day}:${el.description}</p>`
          )
          .addTo(map);
        bounds.extend(el.coordinates);
      });
      map.fitBounds(bounds, {
        padding: {
          top: 200,
          bottom: 100,
          left: 100,
          right: 100,
        },
      });
    }
  }, [locations]);

  return (
    <div
      ref={mapRef}
      style={{ height: '410px', width: 'auto', borderRadius: '10px' }}
    ></div>
  );
};
