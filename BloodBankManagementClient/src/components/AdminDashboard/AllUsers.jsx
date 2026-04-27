import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../Loading/Loading";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  // const { loading, setLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  
    const [loading, setLoading] = useState(true);  
  const [isMenuOpen, setIsMenuOpen] = useState(null); // To manage which user's menu is open

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); // Display 8 users per page

  useEffect(() => {
    const fetchUsers = async () => {
      // setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // This should always run
      }
    };
  
    fetchUsers();
  }, [setLoading]);


  const toggleMenu = (userId) => {
    setIsMenuOpen(isMenuOpen === userId ? null : userId); // Toggle the menu visibility
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/users/${userId}`);
  
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User has been deleted.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete the user.",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while deleting the user.",
      });
    }
  };
  

  const handleModifyUser = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active";
  
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to ${newStatus === "active" ? "unblock" : "block"} this user.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${newStatus === "active" ? "unblock" : "block"}!`,
      });
  
      if (result.isConfirmed) {
        const response = await axios.patch(
          `http://localhost:3000/users/${userId}`,
          { status: newStatus }
        );
  
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, status: newStatus } : user
            )
          );
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `User status updated to ${newStatus}.`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update user status.",
          });
        }
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating the user status.",
      });
    }
  };

  const handleMakeDonorOrVolunteer = async (userId, currentRole) => {
    try {
      // Prompt confirmation before modifying the role
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
  
      if (result.isConfirmed) {
        // Toggle between "donor" and "volunteer"
        const newRole = currentRole === "donor" ? "volunteer" : "donor";
        const response = await axios.patch(
          `http://localhost:3000/users/${userId}`,
          {
            role: newRole,
          }
        );
  
        if (response.data.success) {
          // Update the user's role in the local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            )
          );
  
          // Success alert
          Swal.fire({
            title: "Updated!",
            text: `User role successfully updated to ${newRole}.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setIsMenuOpen(false); // Close the menu
        } else {
          // Error alert if API fails
          Swal.fire({
            title: "Error!",
            text: "Failed to update user role.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the user role.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };
  

  const handleMakeAdmin = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to make this user an Admin. This action is irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make Admin!",
      });
  
      if (result.isConfirmed) {
        const response = await axios.patch(`http://localhost:3000/users/${userId}`, {
          role: "admin",
        });
  
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: "admin" } : user
            )
          );
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User role updated to Admin.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update user role.",
          });
        }
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating the user role.",
      });
    }
  };
  


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        All Users List
      </h2>
  <div className=" border min-h-[550px] border-gray-400 p-2">
  <table className="w-full  text-sm text-left text-gray-700">
    <thead className="text-xs text-white uppercase bg-red-600">
      <tr>
        <th scope="col" className="px-6 py-3">Name</th>
        <th scope="col" className="px-6 py-3">Email</th>
        <th scope="col" className="px-6 py-3">Role</th>
        <th scope="col" className="px-6 py-3">Status</th>
        <th scope="col" className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentUsers.map((user) => (
        <tr
          key={user._id}
          className="bg-white border-b hover:bg-red-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-red-900"
        >
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {user.username}
          </td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4 capitalize">{user.role}</td>
          <td
            className={`px-6 py-4 capitalize ${
              user.status === "active"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {user.status}
          </td>
          <td className="px-6 py-4 text-right">
            <div className="relative">
              <button
                className="text-gray-500 hover:text-red-700 focus:outline-none"
                onClick={() => toggleMenu(user._id)}
              >
                <FaEllipsisV />
              </button>
              {isMenuOpen === user._id && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-red-500 ring-opacity-50 focus:outline-none">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
                        onClick={() =>
                          handleMakeDonorOrVolunteer(user._id, user.role)
                        }
                      >
                        {user.role === "donor"
                          ? "Make Volunteer"
                          : "Make Donor"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
                        onClick={() =>
                          handleModifyUser(user._id, user.status)
                        }
                      >
                        {user.status === "active"
                          ? "Block User"
                          : "Unblock User"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete User
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>

  {/* Pagination */}
  <div className="flex items-center justify-between p-4 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 ${
        currentPage === 1 && "opacity-50 cursor-not-allowed"
      }`}
    >
      Previous
    </button>
    <div className="text-sm text-gray-500">
      Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
    </div>
    <button
      onClick={handleNext}
      disabled={currentPage === Math.ceil(users.length / usersPerPage)}
      className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 ${
        currentPage === Math.ceil(users.length / usersPerPage) &&
        "opacity-50 cursor-not-allowed"
      }`}
    >
      Next
    </button>
  </div>
</div>

  );
};

export default AllUsers;
