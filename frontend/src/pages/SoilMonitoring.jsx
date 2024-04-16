import React, { useState, useEffect } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
} from "../components";

const SoilMonitoring = () => {
  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Pairing IOT Devices</DashboardTitle>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
        </div>
      </div>
    </div>
  );
};

export default SoilMonitoring;
