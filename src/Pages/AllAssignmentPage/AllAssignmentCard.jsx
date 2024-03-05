/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";


const AllAssignmentCard = ({   assignmentItem }) => {

    const { _id, assignmentTitle,  assignmentNumber,  assignmentLastDate,assignmentImage,difficulty } = assignmentItem || {}

    console.log(assignmentItem)

    return (

        <div className="card bg-base-100 shadow-xl " key={_id}>
            <figure><img className="w-full h-96" src={assignmentImage} alt={assignmentTitle} /></figure>
            <div className="card-body">
                <h2 className="card-title font-extrabold text-3xl">{assignmentTitle}</h2>
                <p className="text-base uppercase font-semibold mt-4">Difficulty: {difficulty} </p>
                <p className="text-base font-semibold uppercase mt-4">Total Marks: {assignmentNumber} </p>
                {/* <p className="text-lg font-semibold text-[#f04336]">Last Date: {assignmentLastDate}</p> */}
               

                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>  <button className="btn bg-[#f04336] hover:bg-[#f04336] text-white">Details</button></Link>
       
                </div>
            </div>
        </div>

    );
};

export default AllAssignmentCard;