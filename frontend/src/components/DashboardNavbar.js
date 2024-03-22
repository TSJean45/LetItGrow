import { NavbarSelect, NotificationBell } from "../components";

const DashboardNavbar = ({identity, farmName}) => {
  return (
      <div className="max-w-screen-2xl mx-auto flex justify-end"> {/* Container for Navbar content */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <NavbarSelect type="location" />
            <div className="flex items-center"> {/* Center the SVG */}
              <NotificationBell />
            </div>
            <NavbarSelect type="profile" identity={identity} farmName={farmName}/>
          </div>
        </div>
      </div>
  );
};

export default DashboardNavbar;
