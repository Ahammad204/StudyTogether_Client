// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import useAuth from "./useAuth";


const useAddedAssignment = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: assignment = [] } = useQuery({
        queryKey: ['assignmentAl', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/assignmentAl?email=${user.email}`);
            return res.data;
        }
    })

    return [assignment, refetch]
};

export default useAddedAssignment;