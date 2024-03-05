/* eslint-disable no-unused-vars */


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import useAuth from "../../Hooks/useAuth";



const DetailsPage = () => {

    const { id } = useParams()
    const [assignmentDetails, setAssignmentDetails] = useState();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(true);

    const { _id, assignmentTitle, assignmentNumber, longDescription, assignmentImage, difficulty, email: ownerEmail } = assignmentDetails || {}

    const { user } = useAuth();

    const email = user.email;
    const names = user.displayName;
    const petId = _id;
    console.log(assignmentDetails)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/allAssignment`);
            const data = await response.json();
            const filteredProducts = data.filter((item) => item._id === id);
            setAssignmentDetails(filteredProducts[0]);

            setIsLoading(false);

        };

        fetchData();
    }, [email, id]);

    const handleAdoptPet = async (e) => {

        e.preventDefault();
        const form = e.target;

        const newAdopt = {

            names: form.names?.value,
            email: form.email?.value,
            phone: form.phoneNumber?.value,
            address: form.address?.value,
            status: 'pending',
            petsId: id,
            ownerEmail: ownerEmail
        }

        console.log(newAdopt);


        // 
        const petRes = await axiosSecure.post('/adopt', newAdopt);
        console.log(petRes.data)
        if (petRes.data.insertedId) {
            // show success popup

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Adopt is added to the Team.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const redirectToLink = () => {
        window.open(longDescription, '_blank');
    };

    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${assignmentImage})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-zinc-100">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold ">{assignmentTitle}</h1>
                        {/* <p className="mb-5 text-lg  font-medium">{longDescription}</p> */}

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                            <button className="btn bg-transparent text-white hover:bg-blue-400  border-2 border-blue-400 hover:border-none font-outfit">Difficulty {difficulty}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-blue-400  border-2 border-blue-400  hover:border-none font-outfit"> Mark: {assignmentNumber}</button>

                            <button className="btn h-auto bg-transparent text-white hover:bg-blue-400 border-2 border-blue-400 hover:border-none font-outfit" onClick={redirectToLink}>Details</button>

                        </div>

                        <div className="">

                            <button

                                className="btn"
                                onClick={() => {

                                    document.getElementById('my_modal_1').showModal();

                                }}

                            >
                                Adopt
                            </button>




                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <dialog id="my_modal_1" className="modal text-slate-500">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <form onSubmit={handleAdoptPet} className="mt-4">


                                        {/* Name and Email row */}
                                        <div className="md:flex mb-8">
                                            <div className="form-control md:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="text" disabled defaultValue={names} required name="names" placeholder="Enter Your Full Name" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                            <div className="form-control md:w-1/2 ml-4">
                                                <label className="label">
                                                    <span className="label-text">E-Mail</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="email" disabled defaultValue={email} required name="email" placeholder="Enter Your Email" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Name and Email row */}
                                        <div className="md:flex mb-8">
                                            <div className="form-control md:w-1/2">
                                                <label className="label">
                                                    <span className="label-text">Phone Number</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="text" required name="phoneNumber" placeholder="Enter Your Phone Number" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                            <div className="form-control md:w-1/2 ml-4">
                                                <label className="label">
                                                    <span className="label-text">Address</span>
                                                </label>
                                                <label className="input-group">

                                                    <input type="text" required name="address" placeholder="Enter Your Address" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>




                                        <input className="btn btn-block text-white bg-[#E59285] hover:bg-[#E59285] " type="submit" value="Adopt" />
                                    </form>
                                </div>
                            </dialog>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;