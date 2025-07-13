import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../UseAxios/useAxiosSecure";
import useAuth from "../UseAuth/UseAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email && !loading, // run only if user is logged in and auth is not loading
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log(res.data)
      return res.data.role || 'user';
    },
  });

  const role = roleData || 'user';

  const isAdmin = () => role === 'admin';
  const isMember = () => role === 'member';
  const isUser = () => role === 'user';
  const hasRole = (...roles) => roles.includes(role);

  return {
    role,
    isAdmin,
    isMember,
    isUser,
    hasRole,
    roleLoading
  };
};

export default useRole;
