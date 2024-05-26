
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    // fetch the user role data from db
    const { data: role = '', isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data.role
        }
    })
    return [role, isLoading]
};

export default useRole;