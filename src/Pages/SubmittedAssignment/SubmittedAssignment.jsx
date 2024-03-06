
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Pagination } from "@mui/material";
import useSubmitAssignment from "../../Hooks/useSubmitAssignment";


const MyAddedAssignment = () => {
    const [submitAssignment, refetch] = useSubmitAssignment();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    //Handle Delete Pet
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/submitAssignment/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Assignment has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const offset = (currentPage - 1) * assignmentsPerPage;
    const currentAssignments = submitAssignment.slice(offset, offset + assignmentsPerPage);
    return (
        <div className="container mx-auto">
            <div className="my-4">
                <h2 className="text-3xl text-center">Submitted Assignments: {submitAssignment?.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Difficulty</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Marks</th>
                            <th className="px-4 py-2">Delete</th>
                            {/* <th className="px-4 py-2">Adopted</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentAssignments?.map((assignment, index) => (
                            <tr key={assignment._id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={assignment?.assignmentImage} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border text-center px-4 py-2">{assignment?.assignmentTitle}</td>
                                <td className="border text-center uppercase px-4 py-2">{assignment?.difficulty}</td>
                                <td className="border text-center uppercase px-4 py-2">{assignment?.status}</td>
                                <td className="border text-center uppercase px-4 py-2">{assignment?.marks}</td>

                             
                                <td className="border text-center px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(assignment?._id)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-blue-400"></FaTrashAlt>
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {submitAssignment.length > assignmentsPerPage && (
                    <div className="mt-4">
                        <Pagination
                            count={Math.ceil(submitAssignment.length / assignmentsPerPage)}
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

export default MyAddedAssignment;