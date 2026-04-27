import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const DashboardDonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dashboard-donation-requests/${id}`)
      .then((response) => {
        const data = response.data;
        setRequest(data); 
      })
      
  }, [id]);



  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-red-600 pb-6 border border-b-gray-400">
          <span className="font-semibold text-red-600">Recipient Name:</span>
          {request?.recipientName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-800">
          <p className="text-lg">
            <span className="font-semibold text-red-600">Location:</span> {`${request?.recipientDistrict}, ${request?.recipientUpazila}`}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Blood Group:</span> {request?.bloodGroup}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Donation Date:</span> {new Date(request?.donationDate).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Donation Time:</span> {request?.hospitalName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Full Address:</span> {request?.fullAddress}
          </p>

          <p className="text-lg">
            <span className="font-semibold text-red-600">Request Message:</span> {request?.requestMessage}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Donation Status:</span> {request?.donationStatus}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Requester Name:</span> {request?.requesterName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Requester Email:</span> {request?.requesterEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardDonationRequestDetails;
