import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
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

// Moves the map whenever coordinates change
function MapUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 16);
  }, [latitude, longitude, map]);

  return null;
}

function LocationMap({ latitude, longitude }) {
  return (
    <div className="w-full h-80 rounded-xl overflow-hidden border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          latitude={latitude}
          longitude={longitude}
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <div>
              <strong>Complaint Location</strong>
              <br />
              Latitude: {latitude}
              <br />
              Longitude: {longitude}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;