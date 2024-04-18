import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { MapDetails } from "../components";
import "./Test.scss";
import { mapContents } from "../constants";

const DashboardMap = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("/space-mapping/all"); // Assuming this endpoint returns all map data
        const data = await response.json();
        console.log("Map data:", data);
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    console.log("Current selected section id:", selectedSectionId);
  }, [selectedSectionId]);

  return (
    <>
      <MapContainer
        center={[2.5059717325438218, 102.37588405609131]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ flex: 1, zIndex: 0 }}
        className="min-h-80 max-h-80 relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {jsonData.map((item) => (
          <Polygon
            key={item.id}
            pathOptions={{
              color: selectedSectionId === item.id ? "blue" : "green", // Change color if this is the selected polygon
            }}
            positions={item.polygons}
            eventHandlers={{
              click: () => {
                setSelectedSectionId(item.id);
              },
            }}
          >
            <Tooltip opacity={1} permanent>
              {item.name}
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
      <div className="p-2 text-center">
        {selectedSectionId && (
          <MapDetails sectionId={selectedSectionId}/>

        )}
      </div>
    </>
  );
};

export default DashboardMap;
