import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { FaUser, FaHeartbeat, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import AdminDashboardHome from './AdminDashboardHome';
import DonorDashbordHome from '../DonorDashboard/DonorDashbordHome';

const AdminHome = () => {
  const { user, loading, setLoading } = useContext(AuthContext);


    const [userRole, setUserRole] = useState(null);

 
 
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`) 
        .then((response) => {
          setUserRole(response.data.role);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  
  return (
    <div className="bg-red-50 text-red-700 p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, <span className='text-4xl capitalize'>{user.displayName}</span></h1>
     {userRole=='admin'?<AdminDashboardHome></AdminDashboardHome>:''}
     {userRole=='donor'?<DonorDashbordHome></DonorDashbordHome>:''}
     {userRole=='volunteer'?<AdminDashboardHome></AdminDashboardHome>:''}
    </div>
  );
};

export default AdminHome;
