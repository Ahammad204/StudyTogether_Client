
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {

    const location = useLocation();

    const noheaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')

    return (
        <div>
            {noheaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noheaderFooter || <Footer></Footer>}
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;