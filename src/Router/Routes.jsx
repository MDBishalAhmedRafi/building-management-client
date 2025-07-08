import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Main_Layout_Pages/Home/Home";
import Apartment from "../Main_Layout_Pages/Aparrtment/Apartment";
import LogIn from "../Main_Layout_Pages/Login/Login";
import Register from "../Main_Layout_Pages/Register/Register";

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
]);

export default router;