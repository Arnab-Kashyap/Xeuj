import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// Move map when coordinates change
function MapUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 16);
  }, [latitude, longitude, map]);

  return null;
}


// Handle clicking on map
function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    click(e) {
      onLocationChange(
        e.latlng.lat,
        e.latlng.lng
      );
    },
  });

  return null;
}


// Draggable marker
function DraggableMarker({
  latitude,
  longitude,
  onLocationChange,
}) {
  const eventHandlers = {
    dragend(e) {
      const marker = e.target;
      const position = marker.getLatLng();

      onLocationChange(
        position.lat,
        position.lng
      );
    },
  };

  return (
    <Marker
      position={[latitude, longitude]}
      draggable={true}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <div>
          <strong>Complaint Location</strong>

          <br />

          Drag this marker to the exact location.

          <br />

          <br />

          Latitude: {latitude}

          <br />

          Longitude: {longitude}
        </div>
      </Popup>
    </Marker>
  );
}


function LocationMap({
  latitude,
  longitude,
  onLocationChange,
}) {
  return (
    <div className="w-full h-80 rounded-xl overflow-hidden border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          latitude={latitude}
          longitude={longitude}
        />

        <MapClickHandler
          onLocationChange={onLocationChange}
        />

        <DraggableMarker
          latitude={latitude}
          longitude={longitude}
          onLocationChange={onLocationChange}
        />

      </MapContainer>
    </div>
  );
}

export default LocationMap;