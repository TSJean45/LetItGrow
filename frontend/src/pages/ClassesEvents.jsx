import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  SpaceForm,
  ClassesCard,
  EventCard,
} from "../components";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { classes, events } from "../constants";

const ClassesEvents = () => {
  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Classes & Events</DashboardTitle>
          <div className="flex items-center space-x-4">
            <Input label="Search" size="lg" />
            <Button variant="solid" ripple={false}>
              Search
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-2 gap-10">
          <div className="col-span-2 mt-5">
            <div className="flex justify-between my-5">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Classes
              </Typography>
              <div className="w-72">
                <Select label="Select Version">
                  <Option>Categories</Option>
                  <Option>Article</Option>
                  <Option>Video</Option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {classes.map((classItem, index) => (
                <ClassesCard
                  key={index}
                  className={classItem.class}
                  desc={classItem.desc}
                  image={classItem.image}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 flex bg-skyBlue mt-5 rounded-lg">
            <div className="m-5">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Events
              </Typography>
              {events.map((eventItem, index) => (
                <EventCard
                  key={index}
                  event={eventItem.event}
                  desc={eventItem.desc}
                  image={eventItem.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesEvents;
