import React, { useEffect, useRef } from 'react';

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const initialCenter = { lat: 51.1694, lng: 71.4491 }; // Coordinates of Astana (Nur-Sultan)
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 12,
      });

      if (inputRef.current) {
        const searchBox = new google.maps.places.SearchBox(inputRef.current);
        mapInstance.current.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            if (place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              onLocationSelect(lat, lng);

              mapInstance.current?.setCenter(place.geometry.location);
              mapInstance.current?.setZoom(15);

              if (markerRef.current) {
                markerRef.current.setMap(null);
              }
              markerRef.current = new google.maps.Marker({
                position: place.geometry.location,
                map: mapInstance.current,
              });
            }
          }
        });
      }

      mapInstance.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onLocationSelect(lat, lng);

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
          markerRef.current = new google.maps.Marker({
            position: event.latLng,
            map: mapInstance.current,
          });
        }
      });
    }
  }, [onLocationSelect]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for places"
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MapPicker;
