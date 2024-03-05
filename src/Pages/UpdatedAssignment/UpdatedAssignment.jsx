// Import necessary libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Your component
const UpdateAssignment = () => {
    const { _id, petName, petAge, category, petLocation, shortDescription, longDescription } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const email = user.email

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            petName: petName,
            petAge: petAge,
            category: category,
            petLocation: petLocation,
            shortDescription: shortDescription,
            longDescription: longDescription,
            petImage: null,
        },
        validationSchema: Yup.object({
            petName: Yup.string().required('Pet name is required'),
            petAge: Yup.number().positive('Age must be a positive number').required('Pet age is required'),
            category: Yup.string().required('Category is required').matches(/^(cats|dogs|rabbit|fish|birds|horses)$/, 'Invalid category'),
            petLocation: Yup.string().required('Pet Location is required'),
            shortDescription: Yup.string().required('Short Description is required'),
            longDescription: Yup.string().required('Long Description is required'),
            petImage: Yup.mixed().required('Pet image is required'),
        }),

        onSubmit: async (values) => {

            console.log('Form data submitted:', values);
            const currentDate = new Date();
            const date = values.addedDate = currentDate.toISOString();
            console.log(date)
            console.log(values)
            const imageFile = { image: values.petImage }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {

                const petItem = {
                    petName: values.petName,
                    category: values.category,
                    petAge: parseFloat(values.petAge),
                    petLocation: values.petLocation,
                    shortDescription: values.shortDescription,
                    longDescription: values.longDescription,
                    date: date,
                    adopted: false,
                    email: email,
                    image: res.data.data.display_url,
                };


                const petRes = await axiosSecure.patch(`/pet/${_id}`, petItem);
                console.log(petRes.data)
                if (petRes.data.modifiedCount > 0) {


                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${values.petName} is Updated to the PetListing.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            console.log('with image url', res.data);
        },
    });

    return (
        <div>
           
            <form onSubmit={formik.handleSubmit}>
                {/* Pet Name Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="petName"><span className="label-text">Pet Name*</span></label>
                    <input
                        type="text"
                        placeholder="Enter Pet Name"
                        id="petName"
                        name="petName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.petName}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.petName && formik.errors.petName ? (
                        <div>{formik.errors.petName}</div>
                    ) : null}
                </div>

                {/* Pet Age Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="petAge"><span className="label-text">Pet Age*</span></label>
                    <input
                        type="number"
                        placeholder="Enter Pet Age"
                        id="petAge"
                        name="petAge"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.petAge}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.petAge && formik.errors.petAge ? (
                        <div>{formik.errors.petAge}</div>
                    ) : null}
                </div>
                {/* Category Input (React Select) */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="category"><span className="label-text">Category*</span></label>
                    <Select
                        id="category"
                        name="category"
                        options={[
                            { value: 'cats', label: 'Cat' },
                            { value: 'dogs', label: 'Dog' },
                            { value: 'rabbit', label: 'Rabbit' },
                            { value: 'fish', label: 'Fish' },
                            { value: 'birds', label: 'Birds' },
                            { value: 'horses', label: 'Horse' },
                        ]}
                        onChange={(selectedOption) => {
                            formik.setFieldValue('category', selectedOption.value);
                            // console.log('Selected Option:', selectedOption);
                            // console.log('Formik Values:', formik.values);
                        }}

                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        className="react-select"
                    />
                    {formik.touched.category && formik.errors.category ? (
                        <div>{formik.errors.category}</div>
                    ) : null}
                </div>
                {/* Pet Name Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="petLocation"><span className="label-text">Pet Location*</span></label>
                    <input
                        type="text"
                        placeholder="Enter Pet Location"
                        id="petLocation"
                        name="petLocation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.petLocation}
                        className="input input-bordered w-full"
                    />
                    {formik.touched.petLocation && formik.errors.petLocation ? (
                        <div>{formik.errors.petLocation}</div>
                    ) : null}
                </div>
                {/* Pet Name Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="shortDescription"><span className="label-text">Short Description*</span></label>
                    <textarea
                        type="text"
                        placeholder="Short Description"
                        id="shortDescription"
                        name="shortDescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.shortDescription}
                        className="input textarea input-bordered w-full"
                    />
                    {formik.touched.shortDescription && formik.errors.shortDescription ? (
                        <div>{formik.errors.shortDescription}</div>
                    ) : null}
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
                    {formik.touched.longDescription && formik.errors.longDescription ? (
                        <div>{formik.errors.longDescription}</div>
                    ) : null}
                </div>

                {/* Image Upload Input */}
                <div className="form-control w-full my-6">
                    <label className='label' htmlFor="petImage"><span className="label-text">Pet Image*</span></label>
                    <input
                        type="file"
                        id="petImage"
                        name="petImage"
                        onChange={(event) => formik.setFieldValue('petImage', event.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                        className=" w-full file-input max-w-xs"
                    />
                    {formik.touched.petImage && formik.errors.petImage ? (
                        <div>{formik.errors.petImage}</div>
                    ) : null}
                </div>



                {/* Submit Button */}
                <button className='btn bg-[#f04336] hover:bg-[#f04336] w-full text-white' type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
