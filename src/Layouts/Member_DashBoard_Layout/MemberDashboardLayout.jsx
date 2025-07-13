import React from "react";
import { Outlet } from "react-router";
import MemberSidebar from "../../Components/Member_Dashboard_Sidebar/MemberSidebar";


const MemberDashboardLayout = () => {
  return (
      <div className="relative min-h-screen">
        <MemberSidebar />
        <div className="md:ml-64"> {/* Push content right only on md+ */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default MemberDashboardLayout;

