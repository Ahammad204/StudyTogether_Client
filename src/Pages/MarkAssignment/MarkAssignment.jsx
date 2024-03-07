
import { FaPause, FaPlay, } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { Pagination } from "@mui/material";
import useMarkAssignment from "../../Hooks/useMarkAssignment";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaHandHoldingDollar } from "react-icons/fa6";




const MarkAssignment = () => {
    const [markAssignment, refetch] = useMarkAssignment()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const MarkPerPage = 10;


    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    //Handle Update Assignment Status
    const handleUpdateAssignmentStatus = mark => {
        axiosSecure.patch(`/mark/user/${mark._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Assignment status is Update Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    const handleSubmitMark = async (e) => {

        e.preventDefault();
        const form = e.target;

        const assignmentId = form.markId?.value;

        const newAssignment = {

            feedback: form.feedback?.value,
            marks: form.AssignmentMark?.value
        }

        console.log(newAssignment);

        console.log(assignmentId)



        const assignmentRes = await axiosSecure.put(`/mark/user/${assignmentId}`, newAssignment);
        console.log(assignmentRes.data)
        if (assignmentRes.data.modifiedCount > 0) {
            // show success popup

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Assignment is submitted.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    const offset = (currentPage - 1) * MarkPerPage;
    const currentAssinments = markAssignment.slice(offset, offset + MarkPerPage);




    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total Assignment: {markAssignment?.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Marks</th>
                            <th>Assignment Status</th>
                            <th>Give Marks</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentAssinments?.map((mark, index) => <tr key={mark._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={mark?.assignmentImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{mark?.assignmentTitle}</td>
                                <td className="text-center">{mark?.marks}</td>


                                <td>
                                    <button
                                        onClick={() => handleUpdateAssignmentStatus(mark)}
                                        className="btn btn-ghost btn-lg">
                                        {mark?.status === 'pending' ? <FaPause className="text-blue-400" ></FaPause> : <FaPlay className="text-blue-400"></FaPlay>}
                                    </button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => {
                                            document.getElementById(`my_modal_${mark._id}`).showModal();
                                        }}
                                        className="btn btn-ghost btn-lg">
                                        <FaHandHoldingDollar className="text-blue-400" />
                                    </button>


                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id={`my_modal_${mark._id}`} className="modal text-slate-500">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <form onSubmit={handleSubmitMark} className="mt-4">

                                                <input type="hidden" name="markId" value={mark?._id} />

                                                {/* Name and Email row */}
                                                <div className="md:flex mb-8">
                                                    <div className="form-control md:w-1/2">
                                                        <label className="label">
                                                            <span className="label-text">Examinee Name</span>
                                                        </label>
                                                        <label className="input-group">

                                                            <input type="text" disabled defaultValue={mark?.names} required name="names" placeholder="Enter Your Full Name" className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                    <div className="form-control md:w-1/2 ml-4">
                                                        <label className="label">
                                                            <span className="label-text">Examinee Email</span>
                                                        </label>
                                                        <label className="input-group">

                                                            <input type="email" disabled defaultValue={mark?.email} required name="email" placeholder="Enter Your Email" className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Assignment and note row */}
                                                <div className="md:flex mb-8">
                                                    <div className="form-control md:w-1/2">
                                                        <label className="label">
                                                            <span className="label-text">Assignment</span>
                                                        </label>
                                                        <label className="input-group">

                                                            <textarea type="text" disabled defaultValue={mark?.AssignmentSubmit} required name="assignmentSubmit" placeholder="Assignment Submit" className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                    <div className="form-control md:w-1/2 ml-4">
                                                        <label className="label">
                                                            <span className="label-text">Note</span>
                                                        </label>
                                                        <label className="input-group">

                                                            <textarea type="text" disabled defaultValue={mark?.shortNote} required name="shotNote" placeholder="Short Note" className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Mark and Feedback row */}
                                                <div className="md:flex mb-8">
                                                    <div className="form-control md:w-1/2">
                                                        <label className="label">
                                                            <span className="label-text">Mark </span>
                                                        </label>
                                                        <label className="input-group">

                                                            <input type="number" required name="AssignmentMark" placeholder="Mark Assignment " className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                    <div className="form-control md:w-1/2 ml-4">
                                                        <label className="label">
                                                            <span className="label-text">Feedback</span>
                                                        </label>
                                                        <label className="input-group">

                                                            <textarea type="text" required name="feedback" placeholder="Add Some Feedback" className="input input-bordered w-full" />
                                                        </label>
                                                    </div>
                                                </div>




                                                <input className="btn btn-block text-white bg-blue-500 hover:bg-blue-400 " type="submit" value="Submit Marks" />
                                            </form>
                                        </div>
                                    </dialog>


                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                {markAssignment.length > MarkPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(markAssignment?.length / MarkPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAssignment;