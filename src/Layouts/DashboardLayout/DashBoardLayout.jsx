import React from "react";
import Sidebar from "../../Components/DashBoardSideBar/SideBar";
import { Outlet } from "react-router";

const DashBoardLayout = () => {
  return (
      <div className="relative min-h-screen">
        <Sidebar />
        <div className="md:ml-64"> {/* Push content right only on md+ */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default DashBoardLayout;