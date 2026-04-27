import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import districts from "../../Data/states.json";
 import upazilas from "../../Data/districts.json";

const EditDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch donation request data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/edit-donation-requests/${id}`)
      .then((response) => {
        const data = response.data;
        setFormData(data);
        setDistrict(data.recipientDistrict);
        setUpazila(data.recipientUpazila);
      })
      .catch((error) => console.error("Error fetching donation request:", error));
  }, [id]);

  // Filter upazilas based on the selected district
  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find((d) => d.name === district);
      if (selectedDistrict) {
        const relatedUpazilas = upazilas.filter(
          (upazila) => upazila.state_id === selectedDistrict.id
        );
        setFilteredUpazilas(relatedUpazilas);
      }
    }
  }, [district]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const selectedDistrictName = e.target.value;
    setDistrict(selectedDistrictName);
    setFormData((prev) => ({
      ...prev,
      recipientDistrict: selectedDistrictName,
      recipientUpazila: "", 
    }));
  };

  // Handle upazila change
  const handleUpazilaChange = (e) => {
    const selectedUpazilaName = e.target.value;
    setUpazila(selectedUpazilaName);
    setFormData((prev) => ({
      ...prev,
      recipientUpazila: selectedUpazilaName,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/edit-donation-requests/${id}`,
        formData
      );
      Swal.fire({ icon: "success", title: "Updated!", text: "Donation request updated successfully." });
      navigate("/dashboard/my-donation-request");
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Update Failed", text: "Could not update donation request." });
    }
  };

  if (!formData) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mt-16 mx-auto p-6 bg-white border border-gray-400 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipient Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Recipient Name</label>
            <input type="text" name="recipientName" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.recipientName} onChange={handleInputChange} required />
          </div>

          {/* Hospital Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Hospital Name</label>
            <input type="text" name="hospitalName" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.hospitalName} onChange={handleInputChange} required />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Address</label>
            <input type="text" name="fullAddress" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.fullAddress} onChange={handleInputChange} required />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Blood Group</label>
            <select name="bloodGroup" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.bloodGroup} onChange={handleInputChange} required>
              {bloodGroups.map((group, index) => (
                <option key={index} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Recipient State</label>
            <select
              name="recipientDistrict"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              value={district}
              onChange={handleDistrictChange}
              required
            >
              <option value="" disabled>Select State</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Recipient District</label>
            <select
              name="recipientUpazila"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              value={upazila}
              onChange={handleUpazilaChange}
              required
            >
              <option value="" disabled>Select District</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          {/* Donation Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Donation Date</label>
            <input type="date" name="donationDate" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.donationDate} onChange={handleInputChange} required />
          </div>

          {/* Donation Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Donation Time</label>
            <input type="time" name="donationTime" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.donationTime} onChange={handleInputChange} required />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Request Message</label>
          <textarea name="requestMessage" className="w-full border border-gray-400 rounded-lg px-4 py-2" value={formData.requestMessage} onChange={handleInputChange} rows="4" required />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="px-3 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-900 transition duration-200">Update Request</button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;