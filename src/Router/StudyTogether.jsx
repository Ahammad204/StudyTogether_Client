import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../Layout/MainLayout';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Error from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import DashHome from "../Pages/Dashboard/Dashboard/Home/DashHome";
import CreateAssignment from "../Pages/CreateAssignment/CreateAssignment";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },{

                path:'/login',
                element: <Login></Login>

            },{

                path:'signUp',
                element:<SignUp></SignUp>

            }
        ]
    },{

        path:'dashboard',
        element:<Dashboard></Dashboard>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'dashHome',
                element:<DashHome></DashHome>
            },{

                path:'/dashboard/createAssignment',
                element:<CreateAssignment></CreateAssignment>

            }
        ]

    }
]);
