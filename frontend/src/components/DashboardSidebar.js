import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  ChatBubbleBottomCenterTextIcon,
  ShieldCheckIcon,
  SunIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CommandLineIcon
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { personalSidebar, farmerSidebar } from "../constants"; // Import your constants

const iconMap = {
  dashboard: PresentationChartLineIcon,
  mapping: PencilSquareIcon,
  bot:   ChatBubbleBottomCenterTextIcon,
  disease: ShieldCheckIcon,
  crop: SunIcon,
  user: UserCircleIcon,
  sim:CommandLineIcon,
  forum:BookOpenIcon,
  class:AcademicCapIcon,
  market:BuildingStorefrontIcon,
  // Add more icon mappings as needed
};

const DashboardSidebar = ({ type }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Choose the appropriate constant based on the type
  const data = type === "farmer" ? farmerSidebar : personalSidebar;

  return (
    <div className="z-50 fixed top-0 left-0 h-screen w-15 bg-ultLightGreen mobile:bg-transparent tablet:bg-transparent">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 z-50"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img src={logo} alt="brand" className="h-auto w-auto" />
          </div>
          <List>
            {data.map((item, index) => {
              const IconComponent = iconMap[item.icon] || UserCircleIcon;
              return (
                <ListItem key={index}>
                  <ListItemPrefix>
                    <IconComponent className="h-5 w-5"/>
                  </ListItemPrefix>
                  <a href={item.link}>{item.name}</a>
                </ListItem>
              );
            })}
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <a href="/">Profile</a>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <a href="/">Log Out</a>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  );
};

export default DashboardSidebar;
