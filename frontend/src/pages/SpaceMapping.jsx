import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  SpaceForm
} from "../components";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  FeatureGroup
} from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl} from "react-leaflet-draw"

const SpaceMapping = () => {
  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Space Mapping</DashboardTitle>
        </div>
        <div className="grid grid-cols-3 mt-2 gap-4">
          <div className="col-span-1 flex">
            <SpaceForm />
          </div>

          <div className="col-span-2 flex">
            <MapContainer
              center={[2.5312673261085106, 102.35790252685548]}
              zoom={16}
              scrollWheelZoom={true}
              style={{ flex: 1, zIndex: 0, width: "100%" }} // Set width to 100%
              className="h-full relative"
            >
                <FeatureGroup>
                    <EditControl position="topright"/>
                </FeatureGroup>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceMapping;
