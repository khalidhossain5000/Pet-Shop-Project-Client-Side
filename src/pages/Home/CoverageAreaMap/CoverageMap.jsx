import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import divisions from "../../../Data/division.json";
import "leaflet/dist/leaflet.css";

// Custom marker icon 
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const CoverageMap = () => {
  const bangladeshCenter = [23.685, 90.3563]; // Lat, Lng

  return (
    <div className="w-full h-[600px] lg:h-[900px] overflow-hidden py-12 lg:py-24 container mx-auto">
      <h1 className="text-2xl lg:text-4xl font-primary font-bold text-light-text text-center mb-12">
        Our Coverage Area
      </h1>

        <MapContainer
          center={bangladeshCenter}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers for each division */}
          {divisions.map((division) => (
            <Marker
              key={division.id}
              position={[division.lat, division.lng]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{division.name}</strong>
                <br />
                {division.info || "Service Available"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      
    </div>
  );
};

export default CoverageMap;
