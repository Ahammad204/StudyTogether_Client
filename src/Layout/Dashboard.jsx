import { FaBook, FaHouse } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-400">

                <ul className="menu p-4">

                    <li> <FaHouse></FaHouse> <NavLink to='/dashboard/dashHome'><FaHouse></FaHouse> Home</NavLink></li>

                    <li> <FaHouse></FaHouse> <NavLink to='/dashboard/createAssignment'><FaBook></FaBook> Create Assignment</NavLink></li>


                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;