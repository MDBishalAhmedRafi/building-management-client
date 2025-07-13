import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Main_Layout_Pages/Home/Home";
import Apartment from "../Main_Layout_Pages/Aparrtment/Apartment";
import LogIn from "../Main_Layout_Pages/Login/Login";
import Register from "../Main_Layout_Pages/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute";
// import AdminRoute from "../Provider/AdminRoute";
import DashBoardLayout from "../Layouts/DashboardLayout/DashBoardLayout";
import AdminProfile from "../DashBoard_Layout_Pages/AdminProfile/AdminProfile";
import ManageMembers from "../DashBoard_Layout_Pages/ManageMembers/ManageMembers";
import MakeAnnouncement from "../DashBoard_Layout_Pages/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../DashBoard_Layout_Pages/AgreementRequests/AgreementRequests";
import ManageCoupons from "../DashBoard_Layout_Pages/ManageCoupons/ManageCoupons";
// import MemberProfile from "../DashBoard_Layout_Pages/Member_Pages/MemberProfile";
// import MakePayment from "../DashBoard_Layout_Pages/MakePayment/MakePayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apartment",
        element: <Apartment></Apartment>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {/* <AdminRoute> */}
          <DashBoardLayout />
        {/* </AdminRoute> */}
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminProfile /> },
      { path: "manage-members", element: <ManageMembers /> },
      { path: "announcement", element: <MakeAnnouncement /> },
      { path: "agreement-requests", element: <AgreementRequests /> },
      { path: "manage-coupons", element: <ManageCoupons /> },

    ],
  },
]);
export default router;
