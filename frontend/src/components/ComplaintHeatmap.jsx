import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

function ComplaintMarkers({ complaints }) {
  const validComplaints = complaints.filter(
    (complaint) =>
      complaint.coordinates?.latitude != null &&
      complaint.coordinates?.longitude != null
  );

  return (
    <>
      {validComplaints.map((complaint) => (
        <Marker
          key={complaint._id}
          position={[
            complaint.coordinates.latitude,
            complaint.coordinates.longitude,
          ]}
        >
          <Popup>
            <div className="min-w-[220px]">
              <h3 className="font-bold text-lg mb-2">
                {complaint.title}
              </h3>

              <p>
                <strong>Complaint ID:</strong>{" "}
                {complaint.complaintId}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {complaint.category}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {complaint.status}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {complaint.location}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
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
          <ComplaintMarkers complaints={complaints} />
        </MapContainer>
      </div>
    </div>
  );
}

export default ComplaintHeatmap;