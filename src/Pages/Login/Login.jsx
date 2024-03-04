import { useContext } from 'react';
import loginImg from '../../assets/Login/images.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {


    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const handleLogin = event => {

        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {

                const user = result.user;
                console.log(user);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(from, {replace: true});

            })
            .catch(error => {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                   
                  });

                  console.log(error)

            })

    }

  

    return (
        <>

            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>

            <div className="hero min-h-screen ">
                <div className="hero-content flex-col md:flex-row ">
                    <div className="text-center md:mr-48 lg:text-left">
                        <img className='w-80 h-96 ' src={loginImg} alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                          
                            <div className="form-control mt-6">

                                <input  type="submit" value="Login" className="btn text-white bg-blue-400 hover:bg-blue-600" />
                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        <p className='text-center text-xl mb-5'><small>New Here? <Link className='text-blue-400' to="/signup">Create An Account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;