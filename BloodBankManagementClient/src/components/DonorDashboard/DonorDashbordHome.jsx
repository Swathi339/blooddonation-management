import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaEllipsisH,
  FaEye,
  FaEdit,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const DonorDashbordHome = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [recentDonations, setRecentDonations] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDonationId, setDeleteDonationId] = useState(null);
  const navigate = useNavigate();

  // Fetch recent donations of the user
  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        if (user?.email) {
          const response = await axios.get(
            `http://localhost:3000/donation-requests/${user.email}`
          );
          const donorDonations = response.data;
          const sortedDonations = donorDonations
            .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt))
            .slice(0, 3);

          setRecentDonations(sortedDonations);
        }
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDonations();
  }, [user, setLoading]);

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

  return (
    <div className="">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Recent Donation Requests
      </h2>
      <div className="relative min-h-96 overflow-y-hidden  overflow-x-auto lg:overflow-x-hidden sm:rounded-lg">
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
            {recentDonations.map((donation) => (
              <tr
                key={donation._id}
                className="bg-white border-b  hover:bg-red-50"
              >
                <td className="px-6 py-4">{donation.recipientName}</td>
                <td className="px-6 py-4">
                  {donation.recipientDistrict}, {donation.recipientUpazila}
                </td>
                <td className="px-6 py-4">
                  {new Date(donation.donationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{donation.bloodGroup}</td>
                <td className="px-6 py-4">
                  {donation.donationStatus === "inprogress" && (
                    <>
                      <p>{donation?.donorName}</p>
                      <p>{donation?.donorEmail}</p>
                    </>
                  )}
                  {donation.donationStatus === "done" && (
                    <>
                      <p>{donation?.donorName}</p>
                      <p>{donation?.donorEmail}</p>
                    </>
                  )}

                  {console.log(donation.donorEmail)}
                </td>

                <td
                  className={`px-6 py-4 ${
                    donation.donationStatus === "done"
                      ? "text-green-600"
                      : donation.donationStatus === "canceled"
                      ? "text-red-600"
                      : donation.donationStatus === "pending"
                      ? "text-blue-600"
                      : "text-purple-600"
                  }`}
                >
                  {donation.donationStatus}
                </td>
                <td className="px-6 py-4 space-x-2 relative z-10">
                  <button
                    onClick={() => toggleDropdown(donation._id)}
                    className={`p-2 rounded-full hover:bg-red-50 transition-colors ${
                      dropdown === donation._id
                        ? "bg-red-50 text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    <FaEllipsisH size={18} />
                  </button>
                  {dropdown === donation._id && (
                    <div className="absolute z-40 right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg ">
                      {/* Dropdown arrow */}
                      <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={() =>
                              navigate(
                                `/dashboard-donation-request/${donation._id}`
                              )
                            }
                            className="w-full px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-400"
                          >
                            <FaEye className="text-blue-500" />
                            <span>View Details</span>
                          </button>
                        </li>
                        {(donation.donationStatus === "pending" ||
                          donation.donationStatus === "inprogress") && (
                          <li>
                            <button
                              onClick={() =>
                                navigate(
                                  `/edit-donation-request/${donation._id}`
                                )
                              }
                              className="w-full px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-400"
                            >
                              <FaEdit className="text-purple-500" />
                              <span>Edit Request</span>
                            </button>
                          </li>
                        )}
                        {donation.donationStatus === "inprogress" && (
                          <>
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(donation._id, "done")
                                }
                                className="w-full px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-400"
                              >
                                <FaCheck className="text-green-500" />
                                <span>Mark as Done</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(donation._id, "canceled")
                                }
                                className="w-full px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-400"
                              >
                                <FaTimes className="text-red-500" />
                                <span>Cancel Request</span>
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
                              className="w-full px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-400"
                            >
                              <FaTrash className="text-red-500" />
                              <span>Delete Request</span>
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

      {/* View All Requests Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/dashboard/my-donation-request")}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          View My All Requests
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this donation request?</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => {
                  handleDeleteRequest(deleteDonationId);
                  setShowDeleteModal(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashbordHome;
