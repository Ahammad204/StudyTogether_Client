import signUpImg from '../../assets/Login/images.png'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';



const SignUp = () => {



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {createUser, updateUserProfile} = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (data) => {

        console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photo = data.photoURL

        createUser(email,password)
        .then(result => {

            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(name,photo)
            .then(() => {

                console.log('User Profile Updated')
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Has been Created",
                    showConfirmButton: false,
                    timer: 1500
                  });

                  navigate('/')

            })

            .catch(error => {

                console.log(error)

            })

        })

    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss || Sign Up</title>
            </Helmet>

            <div className="hero min-h-screen "  >
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div  className="text-center lg:text-left md:ml-52">
                        <img className='w-80 h-72' src={signUpImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name"  {...register("name", { required: true })} placeholder="Enter Your Full Name" className="input input-bordered" required />
                                {errors.name && <span className='text-red-600 mt-2'>This field is required</span>}
                            </div>

                            {/* PhotUrl Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Enter Your Photo Url" className="input input-bordered" required />
                                {errors.photoURL && <span className='text-red-600 mt-2'>This field is required</span>}
                            </div>

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter Your Email" className="input input-bordered" required />
                                {errors.email && <span className='text-red-600 mt-2'>This field is required</span>}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {

                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6}/

                                })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className='text-red-600 mt-2'>Password Must be 6 character and need at least one uppercase , one special character, one lowercase</span>}

                            </div>

                            <div className="form-control mt-6">
                                <input className="btn text-white bg-blue-400 hover:bg-blue-600" type="submit" value="Sign Up" />

                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        <p className='text-center text-xl mb-5'><small>Already Have an account? <Link className='text-blue-400' to="/login">Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;