import { NavbarSelect, NotificationBell } from "../components";

const DashboardNavbar = ({identity, name}) => {
  return (
      <div className="max-w-screen-2xl mb-5 mx-auto flex justify-end"> {/* Container for Navbar content */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center"> {/* Center the SVG */}
              <NotificationBell />
            </div>
            <NavbarSelect type="profile" identity={identity} name={name}/>
          </div>
        </div>
      </div>
  );
};

export default DashboardNavbar;
