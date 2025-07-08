import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Main_Layout_Pages/Home/Home";
import Apartment from "../Main_Layout_Pages/Aparrtment/Apartment";

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
    ]
  },
]);

export default router;