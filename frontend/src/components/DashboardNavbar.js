import { NavbarSelect } from "../components";

const DashboardNavbar = () => {
  return (
      <div className="max-w-screen-2xl mx-auto flex justify-end"> {/* Container for Navbar content */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <NavbarSelect type="location" />
            <div className="flex items-center"> {/* Center the SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="navy"
                className="w-6 h-6"
              >
                {/* SVG paths */}
              </svg>
            </div>
            <NavbarSelect type="profile" />
          </div>
        </div>
      </div>
  );
};

export default DashboardNavbar;
