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

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 16);
  }, [latitude, longitude, map]);

  return null;
}

async function getLocationName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return data.display_name || `${latitude}, ${longitude}`;
  } catch (error) {
    console.error("Reverse geocoding error:", error);

    return `${latitude}, ${longitude}`;
  }
}

function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    async click(e) {
      if (!onLocationChange) return;

      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      const locationName = await getLocationName(
        latitude,
        longitude
      );

      onLocationChange(
        latitude,
        longitude,
        locationName
      );
    },
  });

  return null;
}

function DraggableMarker({
  latitude,
  longitude,
  onLocationChange,
  readOnly,
}) {
  const eventHandlers = {
    async dragend(e) {
      if (readOnly || !onLocationChange) return;

      const marker = e.target;
      const position = marker.getLatLng();

      const newLatitude = position.lat;
      const newLongitude = position.lng;

      const locationName = await getLocationName(
        newLatitude,
        newLongitude
      );

      onLocationChange(
        newLatitude,
        newLongitude,
        locationName
      );
    },
  };

  return (
    <Marker
      position={[latitude, longitude]}
      draggable={!readOnly}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <strong>Complaint Location</strong>

        <br />
        <br />

        {readOnly
          ? "This is the reported complaint location."
          : "Drag this marker to the exact location."}

        <br />
        <br />

        Latitude: {latitude}

        <br />

        Longitude: {longitude}
      </Popup>
    </Marker>
  );
}

function LocationMap({
  latitude,
  longitude,
  onLocationChange,
  readOnly = false,
}) {
  return (
    <div className="w-full h-[320px] rounded-xl overflow-hidden border">
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

        {!readOnly && (
          <MapClickHandler
            onLocationChange={onLocationChange}
          />
        )}

        <DraggableMarker
          latitude={latitude}
          longitude={longitude}
          onLocationChange={onLocationChange}
          readOnly={readOnly}
        />
      </MapContainer>
    </div>
  );
}

export default LocationMap;