import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/donation-requests-pending")
      .then((response) => {
        setRequests(response.data);  
        setLoading(false);  
      })
      
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6 mt-14 rounded-lg bg-gradient-to-r from-red-200 to-red-300 m-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-700 leading-tight">
        Pending Blood Donation Requests
      </h2>
      
      {requests.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex flex-col p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl border transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-3 text-red-600">{request.recipientName}</h3>
              <p className="text-gray-700">
                <strong className="text-red-600">Location:</strong> {`${request.recipientDistrict}, ${request.recipientUpazila}`}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Blood Group:</strong> {request.bloodGroup}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Date:</strong> {new Date(request.donationDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Time:</strong> {request.donationTime}
              </p>
              <div className="mt-auto"> {/* This ensures the button stays at the bottom */}
                <button
                  onClick={() => navigate(`/donation-request/${request._id}`)}
                  className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-900 transition duration-300 ease-in-out"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
         
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">No pending requests at the moment.</p>
      )}
       
    </div>
  );
};

export default DonationRequests;
