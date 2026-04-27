import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const UserProfileDashboard = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if(!user?.email){
        setLoading(true)
    }
    if (user?.email) {
        
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((response) => {
          setUserData(response.data);
          setOriginalUserData(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error))
        .finally(() => setLoading(false));
    }
  }, [user, setLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!userData) return;
    setIsSaving(true);
    axios
      .put(`http://localhost:3000/users/${user.email}`, userData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User data updated successfully!.",
        });
        setIsEditable(false);
        setOriginalUserData(userData);
        setIsSaving(false);
      })
      .catch(error);
    
  };
  if (loading){
    return<loading></loading>
  }

  return (
    <div className=" h-[800px] p-6 bg-white  rounded-lg border border-gray-400 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">User Profile</h2>
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      <form className="space-y-5">
        <div className="flex justify-center mb-4">
          <img
            src={userData?.image || "/placeholder-avatar.png"}
            alt="User Avatar"
            className="w-56  rounded-lg border-2 border-red-200"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="username"
            value={userData?.username || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              isEditable
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 bg-gray-100"
            }`}
            disabled={!isEditable}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userData?.email || ""}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            District
          </label>
          <input
            type="text"
            name="district"
            value={userData?.district || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              isEditable
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 bg-gray-100"
            }`}
            disabled={!isEditable}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Upazila
          </label>
          <input
            type="text"
            name="upazila"
            value={userData?.upazila || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              isEditable
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 bg-gray-100"
            }`}
            disabled={!isEditable}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={userData?.bloodGroup || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              isEditable
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 bg-gray-100"
            }`}
            disabled={!isEditable}
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfileDashboard;
