import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const AllDonationRequest = () => {
  const { user} = useContext(AuthContext);
  const [recentDonations, setRecentDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  // Fetch recent donations of the user
  useEffect(() => {
    const fetchRecentDonations = async () => {
      setLoading(true)
      try {
        if (user?.email) {
          const response = await axios.get(
            `http://localhost:3000/donation-requests`
          );
          
          
          const donorDonations = response.data;
          const sortedDonations = donorDonations.sort(
            (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt)
          );

          setRecentDonations(sortedDonations);
          setFilteredDonations(sortedDonations); 
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDonations();
  }, [user, setLoading]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setStatusFilter(filter);

    if (filter === "") {
      setFilteredDonations(recentDonations);
    } else {
      const filtered = recentDonations.filter(
        (donation) => donation.donationStatus === filter
      );
      setFilteredDonations(filtered);
    }
  };

  if (loading || !recentDonations.length) {
    return null;
  }

  // Handle changing the status of the donation
  const handleStatusChange = async (donationId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/donation-requests/${donationId}`,
        { donationStatus: newStatus }
      );
      if (response.status === 200) {
        setRecentDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === donationId
              ? { ...donation, donationStatus: newStatus }
              : donation
          )
        );
        setFilteredDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === donationId
              ? { ...donation, donationStatus: newStatus }
              : donation
          )
        );
        setDropdown(false);
        Swal.fire(
          "Success",
          `Donation status changed to ${newStatus}.`,
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to update donation status.", "error");
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
      Swal.fire("Error", "There was an error updating the status.", "error");
    }
  };

  // Handle deleting a donation request
  const handleDeleteRequest = async (donationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/donation-requests/${donationId}`
        );
        setRecentDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
        setFilteredDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
        Swal.fire(
          "Deleted!",
          "Your donation request has been deleted.",
          "success"
        );
      } catch (error) {
        console.error("Error deleting donation request:", error);
        Swal.fire("Error", "There was an error deleting the request.", "error");
      }
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setDropdown(dropdown === id ? null : id);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        All Blood Donation Requests
      </h2>

      {/* Filter Section */}
      <div className="mb-4 ">
        <label htmlFor="statusFilter" className="font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleFilterChange}
          className="ml-2 px-4 py-2 border border-gray-400 rounded-lg focus:ring focus:ring-red-300"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="relative p-2 min-h-[700px] overflow-x-auto lg:overflow-x-hidden border border-gray-400 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-red-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Recipient Name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Donation Date
              </th>
              <th scope="col" className="px-6 py-3">
                Blood Group
              </th>
              <th scope="col" className="px-6 py-3">
                Donor Information
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr
                key={donation._id}
                className="bg-white border-b hover:bg-red-50"
              >
                <td className="px-6 py-4">{donation.recipientName}</td>
                <td className="px-6 py-4">
                  {donation.recipientDistrict}, {donation.recipientUpazila}
                </td>
                <td className="px-6 py-4">
                  {new Date(donation.donationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{donation.bloodGroup}</td>
                {/* Show loading if donation data is not yet available */}
                {!donation ? (
                  <p>Loading...</p>
                ) : (
                  <td className="px-6 py-4">
                    {donation.donationStatus === "inprogress" && (
                      <>
                        <p>{donation.donorName}</p>
                        <p>{donation.donorEmail}</p>
                      </>
                    )}
                    {donation.donationStatus === "done" && (
                      <>
                        <p>{donation.donorName}</p>
                        <p>{donation.donorEmail}</p>
                      </>
                    )}
                  </td>
                )}

                <td
                  className={`px-6 py-4 ${
                    donation.donationStatus === "done"
                      ? "text-green-600"
                      : donation.donationStatus === "canceled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {donation.donationStatus}
                </td>
                <td className="px-6 py-4 space-x-2 relative z-10">
                  <button
                    onClick={() => toggleDropdown(donation._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaEllipsisH size={18} />
                  </button>
                  {dropdown === donation._id && (
                    <div className="absolute  right-0 mt-2 w-40 bg-gray-300 border border-gray-500 rounded-md shadow-lg">
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={() =>
                              navigate(
                                `/dashboard-donation-request/${donation._id}`
                              )
                            }
                            className="block px-4 py-2 text-gray-700 hover:bg-red-300 hover:text-white "
                          >
                            View
                          </button>
                        </li>
                        {(donation.donationStatus === "pending" ||
                          donation.donationStatus === "inprogress") && (
                          <>
                            <li>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/edit-donation-request/${donation._id}`
                                  )
                                }
                                className="block px-4 py-2 text-gray-700 hover:bg-red-300 hover:text-white"
                              >
                                Edit
                              </button>
                            </li>
                          </>
                        )}
                        {(donation.donationStatus === "pending" ||
                          donation.donationStatus === "inprogress" ||
                          donation.donationStatus === "done" ||
                          donation.donationStatus === "canceled") && (
                          <li>
                            <button
                              onClick={() => handleDeleteRequest(donation._id)}
                              className="block px-4 py-2 text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </li>
                        )}
                        {donation.donationStatus === "pending" && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange(donation._id, "inprogress")
                              }
                              className="block px-4 py-2 text-blue-600 hover:bg-yellow-100"
                            >
                              Make Inprogress
                            </button>
                          </li>
                        )}
                        {donation.donationStatus === "inprogress" && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange(donation._id, "done")
                              }
                              className="block px-4 py-2 text-green-600 hover:bg-green-100"
                            >
                              Make Done
                            </button>
                          </li>
                        )}
                        {donation.donationStatus === "pending" && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusChange(donation._id, "canceled")
                              }
                              className="block px-4 py-2 text-red-600 hover:bg-red-100"
                            >
                              Make Canceled
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonationRequest;
