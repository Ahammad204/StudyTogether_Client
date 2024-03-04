import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../Layout/MainLayout';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Error from "../Pages/ErrorPage/ErrorPage";


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
    },
]);
