import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';

const BarChart = () => {
     const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["category-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/pets/category-count`
      );
      return res.data;
    },
  });
  console.log(data);
  if(isLoading) return <Loading/>
    return (
        <div>
            
        </div>
    );
};

export default BarChart;