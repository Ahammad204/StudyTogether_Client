import { useFormik } from "formik";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import ReactSelect from "react-select";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const CreateAssignment = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()
    const email = user?.email
    const currentDate = new Date();
    const date = currentDate.toISOString();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    // console.log(date)
    // Formik initialization
    // console.log(selectedDate)



    const handleDateChange = (date) => {
        console.log('Selected Date:', date);
        setSelectedDate(date);
        formik.setFieldValue('assignmentLastDate', date);
    };

    const formik = useFormik({
        initialValues: {
            assignmentTitle: '',
            assignmentNumber: '',
            difficulty: '',
            longDescription: '',
            assignmentImage: null,
            assignmentLastDate: new Date(),
        },
        validationSchema: Yup.object({
            assignmentTitle: Yup.string().required('Assignment Title is required'),
            assignmentNumber: Yup.number().positive('Assignment number must be a positive number').required('This Field is required'),
            difficulty: Yup.string().required('difficulty is required').matches(/^(easy|medium|hard)$/, 'Invalid difficulty'),
            longDescription: Yup.string().required('Long Description is required'),
            assignmentImage: Yup.mixed().required('Donation image is required'),
            assignmentLastDate: Yup.date().required('Date is required'),
        }),

        onSubmit: async (values) => {
            // Here you can send the data to your MongoDB server or API
            console.log('Form data submitted:', values);


            // Example: send data to MongoDB
            // axios.post('/api/addPet', values)
            // image upload to imgbb and then get an url

            console.log(values)
            const imageFile = { image: values.assignmentImage }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                // now send the menu item data to the server with the image url
                const assignmentItem = {
                    assignmentTitle: values.assignmentTitle,
                    difficulty: values.difficulty,
                    assignmentNumber: parseFloat(values.assignmentNumber),
                    longDescription: values.longDescription,
                    assignmentCreateDate: date,
                    assignmentLastDate: selectedDate,
                    ownerEmail: email,
                    assignmentImage: res.data.data.display_url,

                };

                const assignmentRes = await axiosPublic.post('/assignment', assignmentItem);
                console.log(assignmentRes.data)



                if (assignmentRes.data.insertedId) {
                    // show success popup

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your Assignment is added .`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            console.log('with image url', res.data);
        },
    });

    const handledifficultyChange = (selectedOption) => {
        // `selectedOption` is an object with `value` and `label` properties
        setSelectedDifficulty(selectedOption);
        formik.setFieldValue('difficulty', selectedOption.value)
    };

    return (
        <div>

            <form onSubmit={formik.handleSubmit}>
                {/* Assignment Name Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="petName"><span className="label-text">Assignment Title*</span></label>
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
                    {formik.touched.assignmentTitle && formik.errors.assignmentTitle ? (
                        <div>{formik.errors.assignmentTitle}</div>
                    ) : null}
                </div>
                {/*  Assignment Number Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentNumber"><span className="label-text">assignmentNumber*</span></label>
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
                    {formik.touched.assignmentNumber && formik.errors.assignmentNumber ? (
                        <div>{formik.errors.assignmentNumber}</div>
                    ) : null}
                </div>
                {/* difficulty Input (React Select) */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="difficulty"><span className="label-text">difficulty*</span></label>
                    <ReactSelect
                        id="difficulty"
                        name="difficulty"
                        options={[
                            { value: 'easy', label: 'Easy' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'hard', label: 'Hard' },

                        ]}
                        // onChange={(selectedOption) => {
                        //     formik.setFieldValue('category', selectedOption.value);

                        // }}
                        onChange={handledifficultyChange}

                        onBlur={formik.handleBlur}
                        value={selectedDifficulty}
                        className="react-select"
                    />
                    {formik.touched.difficulty && formik.errors.difficulty ? (
                        <div>{formik.errors.difficulty}</div>
                    ) : null}
                </div>
                {/* Last Date */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="assignmentLastDate"><span className="label-text">Last Date Of Assignment*</span></label>
                    <DatePicker
                        id="assignmentLastDate"
                        name="assignmentLastDate"
                        selected={formik.values.assignmentLastDate}
                        onChange={handleDateChange}
                        className="input input-bordered w-full"
                    />

                    {formik.touched.assignmentLastDate && formik.errors.assignmentLastDate ? (
                        <div>{formik.errors.assignmentLastDate}</div>
                    ) : null}
                </div>


                {/* Long Description Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="longDescription"><span className="label-text">Details Link*</span></label>
                    <textarea
                        placeholder="Details link"
                        id="longDescription"
                        name="longDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.longDescription}
                        className="input textarea input-bordered w-full"
                    />
                    {formik.touched.longDescription && formik.errors.longDescription ? (
                        <div>{formik.errors.longDescription}</div>
                    ) : null}
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
                        className=" w-full file-input max-w-xs"
                    />
                    {formik.touched.assignmentImage && formik.errors.assignmentImage ? (
                        <div>{formik.errors.assignmentImage}</div>
                    ) : null}
                </div>



                {/* Submit Button */}
                <button className='btn bg-[#f04336] hover:bg-[#f04336] w-full text-white' type="submit">Add Assignment</button>
            </form>
        </div>
    );
};

export default CreateAssignment;