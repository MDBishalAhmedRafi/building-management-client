import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Main_Layout_Pages/Home/Home";
import Apartment from "../Main_Layout_Pages/Aparrtment/Apartment";
import LogIn from "../Main_Layout_Pages/Login/Login";
import Register from "../Main_Layout_Pages/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute"
import DashBoardLayout from "../Layouts/DashboardLayout/DashBoardLayout";
import AdminProfile from "../DashBoard_Layout_Pages/AdminProfile/AdminProfile";
import ManageMembers from "../DashBoard_Layout_Pages/ManageMembers/ManageMembers";
import MakeAnnouncement from "../DashBoard_Layout_Pages/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../DashBoard_Layout_Pages/AgreementRequests/AgreementRequests";
import ManageCoupons from "../DashBoard_Layout_Pages/ManageCoupons/ManageCoupons";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [ 
                { 
                                index: true,
                                path: '/',
                                element: <Home></Home>
                },
                { 
                                path: '/apartment',
                                element: <Apartment></Apartment>,
                },
                { 
                                path: '/login',
                                element: <LogIn></LogIn>,
                },
                { 
                                path: '/register',
                                element: <Register></Register>,
                },
    ]
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

// import {
//   createBrowserRouter,
// } from "react-router";
// import MainLayout from "../Layouts/MainLayout/MainLayout";
// import Home from "../Main_Layout_Pages/Home/Home";
// import Apartment from "../Main_Layout_Pages/Aparrtment/Apartment";
// import LogIn from "../Main_Layout_Pages/Login/Login";
// import Register from "../Main_Layout_Pages/Register/Register";

// import AdminDashboardLayout from "../Layouts/AdminDashBoardLayout/AdminDashboardLayout";
// import AdminProfile from "../Layouts/AdminDashBoardLayout/AdminProfile/AdminProfile";
// import ManageMembers from "../Layouts/AdminDashBoardLayout/ManageMembers/ManageMembers";
// import MakeAnnouncement from "../Layouts/AdminDashBoardLayout/MakeAnnouncement/MakeAnnouncement";
// import AgreementRequests from "../Layouts/AdminDashBoardLayout/AgreementRequests/AgreementRequests"
// import ManageCoupons from "../Layouts/AdminDashBoardLayout/ManageCoupons/ManageCoupons";


// import PrivateRoute from "../Provider/PrivateRoute";
// import AdminRoute from "../Provider/AdminRoute";




// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "/apartment", element: <Apartment /> },
//       { path: "/login", element: <LogIn /> },
//       { path: "/register", element: <Register /> },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <AdminRoute>
//           <AdminDashboardLayout />
//         </AdminRoute>
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <AdminProfile /> },
//       { path: "manage-members", element: <ManageMembers /> },
//       { path: "announcement", element: <MakeAnnouncement /> },
//       { path: "agreement-requests", element: <AgreementRequests /> },
//       { path: "manage-coupons", element: <ManageCoupons /> },
//     ],
//   },
// ]);

// export default router;
