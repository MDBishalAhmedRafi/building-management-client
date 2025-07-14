import React from "react";
import { Outlet } from "react-router";
import UserSidebar from "../../Components/User_Dashboard_Sidebar/UserSidebar";



const UserDashboardLayout = () => {
  return (
      <div className="relative min-h-screen">
        <UserSidebar />
        <div className="md:ml-64"> {/* Push content right only on md+ */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default UserDashboardLayout;

