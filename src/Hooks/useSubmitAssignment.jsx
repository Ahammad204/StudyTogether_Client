// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import useAuth from "./useAuth";



const useSubmitAssignment = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: submitAssignment = [] } = useQuery({
        queryKey: ['submitAssignment', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/submitAssignment?email=${user?.email}`);
            return res.data;
        }
    })

    return [submitAssignment, refetch]
};

export default useSubmitAssignment;