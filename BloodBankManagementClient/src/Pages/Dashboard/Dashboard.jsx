import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { StickyNavbar } from '../../components/Navbar/StickyNavbar';
import { FaPeopleGroup, FaPerson, FaPersonRifle } from 'react-icons/fa6';
import { FaHome, FaHouseUser, FaUser, FaUsers } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';

const Dashboard = () => {
  const { user, loading,setLoading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    
    if (user?.email) {
      
      axios
        .get(`http://localhost:3000/users/${user?.email}`) 
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
  
  const renderNavLinks = () => {
    if (userRole === 'donor') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
           🏠 Donor Home
          </NavLink>
          <NavLink
            to="/dashboard/my-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
          🩸 My Donation Requests 
          </NavLink>
          <NavLink
            to="/dashboard/create-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
           🆕 Create Donation Request 
          </NavLink>
        </>
      );
    } else if (userRole === 'admin') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            🏠 Admin Home 
          </NavLink>
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          > <div className='flex items-center gap-1'>
            <FaUsers></FaUsers>
            All Users
          </div>
          </NavLink>
          <NavLink
            to="/dashboard/all-blood-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
          🩸 All Blood Donation Requests
          </NavLink>
          <NavLink
            to="/dashboard/content-management"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            <div className='flex items-center gap-1'>
            <CiViewList />
            Content Management
            </div>
          </NavLink>
        </>
      );
    } else if (userRole === 'volunteer') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
           🏠 Volunteer Home
          </NavLink>
          <NavLink
            to="/dashboard/all-blood-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            All Blood Donation Requests
          </NavLink>
          <NavLink
            to="/dashboard/content-management"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Content Management
          </NavLink>
        </>
      );
    }
    return null; 
  };

  return (
    <>  
    <div className='sticky top-0 z-50'>
    <StickyNavbar/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen p-1">
      
       {/* Sidebar Navigation * */}
      <div className=" col-span-1 md:col-span-4 lg:col-span-2 px-4 py-6 flex flex-col text-white space-y-2  bg-red-400 min-h-[400px] md:min-h-[600px] lg:min-h-[800px] ">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
          Dashboard
        </h2>
        {renderNavLinks()}

        
        <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            <div className='flex items-center gap-1'>

          <FaUser></FaUser>  Profile
            </div>
          </NavLink>
          
        <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            <div className='flex items-center gap-1'>
            <FaHouseUser></FaHouseUser>
            HomePage
            </div>
          </NavLink>
      </div>

      {/* Main Content */}
      <div className="col-span-1 md:col-span-8 lg:col-span-9 bg-gray-50 p-1">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
