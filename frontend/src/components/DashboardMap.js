import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import {MapDetails} from "../components"
import "./Test.scss";
import { mapContents } from "../constants";

const DashboardMap = () => {
  const polygons = [
    [
      [2.508983648863582, 102.3766028881073],
      [2.5089514932099592, 102.37573385238649],
      [2.508372691309536, 102.3744571208954],
      [2.507600955043879, 102.37336277961732],
      [2.505757361011264, 102.3750150203705],
      [2.50747233228868, 102.37864136695863],
      [2.509005085965552, 102.37661361694336],
    ],
    [
      [2.505757361011264, 102.3750150203705],
      [2.50747233228868, 102.37864136695863],
      [2.5079225118765733, 102.38178491592409],
      [2.5054786779664675, 102.38234281539918],
    ],
    [
      [2.507600955043879, 102.37336277961732],
      [2.505757361011264, 102.3750150203705],
      [2.5054786779664675, 102.38234281539918],
      [2.501920104644034, 102.3804759979248],
      [2.5015556718909306, 102.37509012222291],
      [2.506143229744594, 102.37187147140504],
    ],
    [
      [2.506143229744594, 102.37187147140504],
      [2.5015556718909306, 102.37509012222291],
      [2.501619983560607, 102.36998319625854],
    ],
  ];

  const tooltips = ["Durian A", "Durian B", "Pineapple Field", "Banana Field"];

  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(0);
  const [selectedSectionId, setSelectedSectionId] = useState(mapContents[0].id);

  const handlePolygonClick = (index) => {
    setSelectedPolygonIndex(index);
    console.log(tooltips[index]);
    setSelectedSectionId(mapContents[index].id); // Set the selected section ID
  };

  return (
    <>
      <MapContainer
        center={[2.5059717325438218, 102.37588405609131]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ flex: 1 }}
        className="min-h-80 max-h-80 relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygons.map((_, index) => (
          <Polygon
            key={index}
            pathOptions={{
              color: selectedPolygonIndex === index ? "blue" : "green",
            }}
            positions={polygons[index]}
            eventHandlers={{
              click: () => handlePolygonClick(index),
            }}
          >
            <Tooltip opacity={1} permanent>
              {tooltips[index]}
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
      <div className="p-2 text-center">
        {selectedSectionId && (
          <MapDetails
            sectionId={selectedSectionId}
          />
        )}
      </div>
    </>
  );
};

export default DashboardMap;
