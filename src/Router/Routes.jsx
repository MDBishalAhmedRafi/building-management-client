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
import RoleRoute from "../Provider/RoleRoute";
import MemberDashboardLayout from "../Layouts/Member_DashBoard_Layout/MemberDashboardLayout";
import MemberProfile from "../DashBoard_Layout_Pages/Member_Pages/MemberProfile";
import MakePayment from "../DashBoard_Layout_Pages/MakePayment/MakePayment";
import PaymentHistory from "../DashBoard_Layout_Pages/Member_Pages/PaymentHistory"
import MemberAnnouncement from "../DashBoard_Layout_Pages/Member_Pages/MemberAnnouncement"
import UserDashboardLayout from "../Layouts/User_Dashborad_Layout/UserDashboardLayout";
import UserProfile from "../DashBoard_Layout_Pages/User_Pages/UserProfile";
import UserAnnouncements from "../DashBoard_Layout_Pages/User_Pages/UserAnnouncement";
import CheckoutForm from "../Payment/CheckoutForm"


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
          <RoleRoute allowedRoles={['admin']}>
            <DashBoardLayout />
          </RoleRoute>
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
  // ✅ Member dashboard
{
  path: "/member-dashboard",
  element: (
    <PrivateRoute>
      <RoleRoute allowedRoles={['member']}>
        <MemberDashboardLayout />
      </RoleRoute>
    </PrivateRoute>
  ),
  children: [
    { index: true, path: "profile", element: <MemberProfile /> },
    { path: "make-payment", element: <MakePayment /> },
    { path: "payment-history", element: <PaymentHistory /> },
    { path: "announcements", element: <MemberAnnouncement /> },
    {
  path: "payment-checkout",
  element: <CheckoutForm />,
}

  ],
},

// // ✅ User dashboard
{
  path: "/user-dashboard",
  element: (
    <PrivateRoute>
      <RoleRoute allowedRoles={['user']}>
        <UserDashboardLayout />
      </RoleRoute>
    </PrivateRoute>
  ),
  children: [
    { index: true, path: "profile", element: <UserProfile /> },
    { path: "announcements", element: <UserAnnouncements /> },
  ],
},
]);
export default router;
