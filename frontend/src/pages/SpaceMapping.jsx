import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  SpaceForm,
} from "../components";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import {
  Card,
  Input,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";

const SpaceMapping = () => {
  const units = ["acre", "in", "cm"]; // Define the units for the dropdown
  const [selectedUnit, setSelectedUnit] = useState(units[0]); // Set the initial selected unit
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const [formData, setFormData] = useState({
    fieldName: "",
    plantVariety: "",
    growingArea: "",
    plantingDate: "",
    plantCounts: "",
    notes: "",
    // Add more form fields as needed
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const onCreated = (e) => {
    if (e.layerType === "circle") {
      console.log(
        "circle center, radius =",
        e.layer.getLatLng(),
        e.layer.getRadius()
      );
    } else {
      console.log("polygon coordinates =", e.layer.getLatLngs());
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, coordinates: "add coordinates here" };

    try {
      const response = await fetch("/your-backend-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        setFormSubmitted(true);
      } else {
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Space Mapping</DashboardTitle>
        </div>
        <div className="grid grid-cols-3 mt-2 gap-4">
          <div className="col-span-1 flex">
            <Card
              className="w-full border-2 border-blue-gray-200 p-10"
              color="transparent"
              shadow={false}
            >
              <Typography variant="h4" color="blue-gray">
                Field Detail
              </Typography>
              <form
                onSubmit={handleSubmit}
                className="mt-8 mb-2 w-full max-w-screen-md sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-6">
                  <Input
                    name="fieldName"
                    label="Field Name"
                    size="lg"
                    onChange={handleFormChange}
                  />
                  <Input
                    label="Plant Variety"
                    name="plantVariety"
                    size="lg"
                    onChange={handleFormChange}
                  />
                  {/* <div className="relative flex w-full max-w-[24rem]">
                    <Input
                      label="Growing Area"
                      name="growingArea"
                      onChange={handleFormChange}
                    />
                    <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
                      <Menu placement="bottom-start">
                        <MenuHandler>
                          <Button
                            ripple={false}
                            variant="text"
                            className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10"
                          >
                            {selectedUnit}
                          </Button>
                        </MenuHandler>
                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                          {units.map((unit) => (
                            <MenuItem
                              key={unit}
                              onClick={() => handleUnitChange(unit)}
                            >
                              {unit}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </div>
                  </div> */}
                  <Input
                    label="Planting Date"
                    name="plantingDate"
                    onChange={handleFormChange}
                    size="lg"
                  />

                  <div className="relative flex w-full max-w-[24rem]">
                    <Input
                      label="Plant Counts"
                      onChange={handleFormChange}
                      name="plantCounts"
                    />
                    <div className="absolute right-0 inset-y-0 flex items-center pointer-events-auto">
                      <Button
                        ripple={false}
                        variant="text"
                        className="flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 pr-3"
                      >
                        Plants
                      </Button>
                    </div>
                  </div>
                  <Input
                    label="Notes"
                    onChange={handleFormChange}
                    name="notes"
                    size="lg"
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <Button className="flex-1 mr-2" ripple={false}>
                    Reset
                  </Button>
                  <Button type="submit" className="flex-1 ml-2" ripple={false}>
                    Save
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-span-2 flex">
            <MapContainer
              center={[2.5059717325438218, 102.37588405609131]}
              zoom={16}
              scrollWheelZoom={true}
              style={{ flex: 1, zIndex: 0, width: "100%" }} // Set width to 100%
              className="h-full relative"
            >
              <FeatureGroup>
                <EditControl position="topright" onCreated={onCreated} />
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
