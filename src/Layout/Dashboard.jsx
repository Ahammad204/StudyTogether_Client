import { FaBook, FaHouse } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400 text-white">

                <ul className="menu p-4">

                    <li> <FaHouse></FaHouse> <NavLink to='/dashboard/dashHome'><FaHouse></FaHouse> Home</NavLink></li>

                    <li> <FaHouse></FaHouse> <NavLink to='/dashboard/createAssignment'><FaBook></FaBook> Create Assignment</NavLink></li>

                    <li> <FaHouse></FaHouse> <NavLink to='/dashboard/myAddedAssignment'><FaBook></FaBook> My Added Assignment</NavLink></li>


                </ul>

            </div>
             {/* dashboard content */}
             <div className="flex-1 p-8">
                <p className="text-4xl uppercase border-y-4 py-4 text-center"> Welcome {user?.displayName}</p>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;