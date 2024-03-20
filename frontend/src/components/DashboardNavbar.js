import { NavbarSelect }  from "../components";

const DashboardNavbar = () => {
  return (
    <div className="fixed top-0 right-0 bg-white">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
        <div className="flex gap-4">
          <NavbarSelect type="location"/>
          <button className="btn">Settings</button>
          <NavbarSelect type="profile"/>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
