import React, { useState } from "react";
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";

const SpaceForm = () => {
  const units = ["acre", "in", "cm"]; // Define the units for the dropdown
  const [selectedUnit, setSelectedUnit] = useState(units[0]); // Set the initial selected unit

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <Card
      className="w-full border-2 border-blue-gray-200 p-10"
      color="transparent"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Field Detail
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-md sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Input label="Field Name" size="lg" />
          <Input label="Plant Variety" size="lg" />
          <div className="relative flex w-full max-w-[24rem]">
            <Input label="Growing Area" />
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
                    <MenuItem key={unit} onClick={() => handleUnitChange(unit)}>
                      {unit}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
          <Input label="Planting Date" size="lg" />

          <div className="relative flex w-full max-w-[24rem]">
            <Input label="Plant Counts" />
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
          <Input label="Notes" size="lg" />
        </div>
        <div className="flex justify-between mt-5">
          <Button className="flex-1 mr-2" ripple={false}>
            Reset
          </Button>
          <Button className="flex-1 ml-2" ripple={false}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SpaceForm;
