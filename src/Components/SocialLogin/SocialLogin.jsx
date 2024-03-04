import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const SocialLogin = () => {
    
    // eslint-disable-next-line no-unused-vars
    const {user, googleLogin,githubLogin} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const handleSocialLogin = (social) => {

        social()
        .then(result => {

            console.log(result);

            toast.success('User logged in successfully');

            navigate(location?.state ? location.state : '/');

        })
        .catch(error => {
            toast.error("Oops Something Wrong")
            console.log(error)
        })

    }
    
    return (
        <div>
            <>
                <div className="divider">continue with</div>
                <div className="flex justify-around">
                    <button
                        onClick={() => handleSocialLogin(googleLogin)}
                        className="btn text-white border-none bg-blue-400 hover:bg-blue-600 "><FaGoogle className="text-2xl"></FaGoogle>Google</button>
                    <button
                        onClick={() => handleSocialLogin(githubLogin)}
                        className="btn text-white border-none bg-blue-400 hover:bg-blue-600"><FaGithub className="text-2xl"></FaGithub> Github</button>

                </div>
            </>
        </div>
    );
};

export default SocialLogin;