import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

// Custom hook to fetch and return the authenticated user's role
// Usage: const { role, isLoading, error } = useRole();
const useRole = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  const {
    data: role = undefined,
    isLoading,
    
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      // Update this endpoint to match your API contract as needed
      const response = await axiosInstance.get(`/users/role/${user.email}`);
      // Expecting response like: { role: "admin" | "user" | ... }
      return response?.data?.role;
    }
  });
console.log("role and loading",role,loading)
  return {
    role,
    isLoading: loading || isLoading,
  
  };
};

export default useRole;
