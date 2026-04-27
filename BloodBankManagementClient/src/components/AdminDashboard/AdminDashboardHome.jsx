import React, { useContext, useEffect, useState } from 'react';
import { FaDollarSign, FaHeartbeat, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Loading from '../Loading/Loading';

const AdminDashboardHome = () => {
    
      // const { user, loading, setLoading } = useContext(AuthContext);
        const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]);
      const [totalDonation,setTotalDonation]=useState([])
      useEffect(() => {
        const fetchUsers = async () => {
          const response = await axios.get('http://localhost:3000/users');
          setUsers(response.data);
          setLoading(false);
        };
        fetchUsers();
      }, [setLoading]);
    useEffect(() => {
        const fetchUsers = async () => {
          const response = await axios.get('http://localhost:3000/donation-requests');
          setTotalDonation(response.data);
          setLoading(false);
        };
        fetchUsers();
      }, [setLoading]);
      
      if(loading){
        return <Loading></Loading>
      }
    return (
        <div>
             <p className="text-lg mb-6 text-center">
        From this dashboard, you can manage users, monitor blood donation requests, and see total funding.
      </p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaUser className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
        </div>

        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaHeartbeat className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Total Blood Donation Requests</h3>
            <p className="text-3xl font-bold">{totalDonation.length}</p>
          </div>
        </div>

        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaDollarSign className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Total Funding</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>
        </div>
    );
};

export default AdminDashboardHome;