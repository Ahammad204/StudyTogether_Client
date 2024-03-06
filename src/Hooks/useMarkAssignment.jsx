// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import useAuth from "./useAuth";


const useMarkAssignment = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: markAssignment = [] } = useQuery({
        queryKey: ['markAssignment', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/markAssignment?email=${user?.email}`);
            return res.data;
        }
    })

    return [markAssignment, refetch]
};

export default useMarkAssignment;