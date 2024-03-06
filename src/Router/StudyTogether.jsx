import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../Layout/MainLayout';
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Error from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import DashHome from "../Pages/Dashboard/Dashboard/Home/DashHome";
import CreateAssignment from "../Pages/CreateAssignment/CreateAssignment";
import MyAddedAssignment from "../Pages/myAddedAssignment/myAddedAssignment";
import PrivateRoute from "./PrivateRouter";
import UpdateAssignment from "../Pages/UpdatedAssignment/UpdatedAssignment";
import AllAssignment from "../Pages/AllAssignmentPage/AllAssignment";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import SubmittedAssignment from "../Pages/SubmittedAssignment/SubmittedAssignment";
import MarkAssignment from "../Pages/MarkAssignment/MarkAssignment";


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

            },{

                path:'allAssignment',
                element:<AllAssignment></AllAssignment>

            },{

                path:'/details/:id',
                element:<PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>

            }
        ]
    },{

        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'dashHome',
                element:<PrivateRoute><DashHome></DashHome></PrivateRoute>
            },{

                path:'/dashboard/createAssignment',
                element:<PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>

            },{

                path:'/dashboard/myAddedAssignment',
                element: <PrivateRoute><MyAddedAssignment></MyAddedAssignment></PrivateRoute>

            },{

                path:'/dashboard/UpdateItem/:id',
                element:<PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/assignment/${params.id}`)

            },{

                path:'/dashboard/submittedAssignment',
                element:<PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>

            },{

                path:'/dashboard/markAssignment',
                element:<PrivateRoute><MarkAssignment></MarkAssignment></PrivateRoute>

            }
        ]

    }
]);
