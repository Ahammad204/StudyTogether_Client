// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import useAuth from "./useAuth";


const useAddedAssignment = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: assignmentAl = [] } = useQuery({
        queryKey: ['assignment', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/assignmentAl?email=${user?.email}`);
            return res.data;
        }
    })

    return [assignmentAl, refetch]
};

export default useAddedAssignment;