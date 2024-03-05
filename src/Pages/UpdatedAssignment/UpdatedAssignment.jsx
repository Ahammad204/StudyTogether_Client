// Import necessary libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import ReactSelect from 'react-select';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Your component
const UpdateAssignment = () => {
    // Destructuring data from hooks
    const { _id, assignmentTitle, assignmentNumber, difficulty, longDescription, assignmentLastDate } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    // State for selected date and difficulty
    const [selectedDate, setSelectedDate] = useState(new Date(assignmentLastDate));
    const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

    // Date change handler
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            assignmentTitle: assignmentTitle,
            assignmentNumber: assignmentNumber,
            difficulty: difficulty,
            longDescription: longDescription,
            assignmentImage: null,
            assignmentLastDate: assignmentLastDate,
        },
        validationSchema: Yup.object({
            assignmentTitle: Yup.string().required('Assignment Title is required'),
            assignmentNumber: Yup.number().positive('Assignment Number must be a positive number').required('Assignment Number is required'),
            difficulty: Yup.string().required('Difficulty is required').matches(/^(easy|medium|hard)$/, 'Invalid difficulty'),
            longDescription: Yup.string().required('Long Description is required'),
            assignmentImage: Yup.mixed().required('Assignment Image is required'),
            assignmentLastDate: Yup.date().required('Date is required'),
        }),

        onSubmit: async (values) => {
            try {
                // Image upload
                const imageFile = { image: values.assignmentImage }
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                if (res.data.success) {
                    // Prepare assignment data
                    const currentDate = new Date();
                    const assignmentItem = {
                        assignmentTitle: values.assignmentTitle,
                        difficulty: values.difficulty,
                        assignmentNumber: parseFloat(values.assignmentNumber),
                        assignmentLastDate: selectedDate,
                        longDescription: values.longDescription,
                        date: currentDate.toISOString(),
                        email: email,
                        assignmentImage: res.data.data.display_url,
                    };

                    // Update assignment
                    const assignmentRes = await axiosSecure.patch(`/assignment/${_id}`, assignmentItem);
                    if (assignmentRes.data.modifiedCount > 0) {
                        // Show success message
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${values?.assignmentTitle} is updated to all assignments.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });

    // Difficulty change handler
    const handledifficultyChange = (selectedOption) => {
        setSelectedDifficulty(selectedOption.value);
        formik.setFieldValue('difficulty', selectedOption.value);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {/* assignment Title Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentTitle"><span className="label-text">Assignment Title*</span></label>
                    <input
                        type="text"
                        placeholder="Enter Assignment Title"
                        id="assignmentTitle"
                        name="assignmentTitle"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.assignmentTitle}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.assignmentTitle && formik.errors.assignmentTitle && (
                        <div>{formik.errors.assignmentTitle}</div>
                    )}
                </div>

                {/* assignment Number Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentNumber"><span className="label-text">Assignment Number*</span></label>
                    <input
                        type="number"
                        placeholder="Enter Assignment Number"
                        id="assignmentNumber"
                        name="assignmentNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.assignmentNumber}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.assignmentNumber && formik.errors.assignmentNumber && (
                        <div>{formik.errors.assignmentNumber}</div>
                    )}
                </div>

                {/* Difficulty Input (React Select) */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="difficulty"><span className="label-text">Difficulty*</span></label>
                    <ReactSelect
                        id="difficulty"
                        name="difficulty"
                        options={[
                            { value: 'easy', label: 'Easy' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'hard', label: 'Hard' },
                        ]}
                        onChange={handledifficultyChange}
                        onBlur={formik.handleBlur}
                        value={{ value: selectedDifficulty, label: selectedDifficulty }}
                        className="react-select"
                    />
                    {formik.touched.difficulty && formik.errors.difficulty && (
                        <div>{formik.errors.difficulty}</div>
                    )}
                </div>

                {/* Last Date */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentLastDate"><span className="label-text">Date*</span></label>
                    <ReactDatePicker
                        id="assignmentLastDate"
                        name="assignmentLastDate"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.assignmentLastDate && formik.errors.assignmentLastDate && (
                        <div>{formik.errors.assignmentLastDate}</div>
                    )}
                </div>

                {/* Long Description Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="longDescription"><span className="label-text">Long Description*</span></label>
                    <textarea
                        placeholder="Long Description"
                        id="longDescription"
                        name="longDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.longDescription}
                        className="input textarea input-bordered w-full"
                    />
                    {formik.touched.longDescription && formik.errors.longDescription && (
                        <div>{formik.errors.longDescription}</div>
                    )}
                </div>

                {/* Image Upload Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentImage"><span className="label-text">Assignment Image*</span></label>
                    <input
                        type="file"
                        id="assignmentImage"
                        name="assignmentImage"
                        onChange={(event) => formik.setFieldValue('assignmentImage', event.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                        className="w-full file-input max-w-xs"
                    />
                    {formik.touched.assignmentImage && formik.errors.assignmentImage && (
                        <div>{formik.errors.assignmentImage}</div>
                    )}
                </div>

                {/* Submit Button */}
                <button className='btn bg-[#f04336] hover:bg-[#f04336] w-full text-white' type="submit">Update Assignment</button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
