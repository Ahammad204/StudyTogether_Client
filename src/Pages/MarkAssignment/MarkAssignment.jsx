
import {  FaPause, FaPlay, } from "react-icons/fa";
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



    //Handle Update Donation Status
    const handleUpdateAssignmentStatus = mark => {
        axiosSecure.patch(`/mark/user/${mark._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Campaign status is Update Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
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
                                        {mark.status === 'pending' ? <FaPause className="text-red-600" ></FaPause> : <FaPlay className="text-red-600"></FaPlay>}
                                    </button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => {

                                            document.getElementById('my_modal_1').showModal();

                                        }}
                                        className="btn btn-ghost btn-lg">
                                        <FaHandHoldingDollar className="text-red-600" ></FaHandHoldingDollar>

                                    </button>


                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id="my_modal_1" className="modal text-slate-500">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <form className="mt-4">

                                                {/* <Donator assignmentTitle={mark?.assignmentTitle} ></Donator> */}
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