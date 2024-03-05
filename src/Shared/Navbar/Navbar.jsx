import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";



const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const handleLogOut = () => {

        logOut()
            .then(() => {

                console.log("Logout Successful")

            })
            .catch(error => console.log(error))

    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navoptions =
        <>
            <li><Link to="/" style={isActive("/") ? { color: "#5094d4", borderBottom: "2px solid #3b63db" } : {}}>Home</Link></li>
            <li><Link to="/allAssignment" style={isActive("/allAssignment") ? { color: "#5094d4", borderBottom: "2px solid #3b63db" } : {}}>Assignment</Link></li>




            {

                user ?
                    <>

                    </>
                    :
                    <>

                    </>

            }
        </>

    return (
        <>
            <div className="navbar  fixed z-10 bg-opacity-30  bg-black text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                            {navoptions}
                        </ul>
                    </div>
                    <Link to='/'> <a className="btn btn-ghost text-xl">Study Together</a></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-5">
                        {navoptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">

                                    <img src={user?.photoURL} alt={user?.displayName} />

                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm text-center  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="text-center items-center">
                                    <span className="text-black text-center">{user?.displayName}</span>

                                </li>
                                <li className="btn btn-sm btn-ghost text-lg font-semibold text-center text-black"><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li>
                                    <button className="btn btn-sm  btn-ghost text-black"
                                        onClick={handleLogOut}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                            :
                            <Link to="/login"><button className="btn text-black border-none ">Login Now</button></Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;