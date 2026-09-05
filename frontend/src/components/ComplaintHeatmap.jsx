import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

function HeatLayer({ complaints }) {
  const map = useMap();

  useEffect(() => {
    const points = complaints
      .filter(
        (complaint) =>
          complaint.coordinates?.latitude != null &&
          complaint.coordinates?.longitude != null
      )
      .map((complaint) => [
        complaint.coordinates.latitude,
        complaint.coordinates.longitude,
        1,
      ]);

    if (points.length === 0) {
      return;
    }

    const heatLayer = L.heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [complaints, map]);

  return null;
}

function ComplaintHeatmap({ complaints }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-8">
      <h2 className="text-xl font-bold mb-4">
        Complaint Hotspot Map
      </h2>

      <div className="h-[450px] rounded-lg overflow-hidden">
        <MapContainer
          center={[26.1823, 91.7823]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <HeatLayer complaints={complaints} />
        </MapContainer>
      </div>
    </div>
  );
}

export default ComplaintHeatmap;