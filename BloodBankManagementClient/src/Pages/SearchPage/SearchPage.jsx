import React, { useState } from "react";
import districts from "../../Data/states.json";
 import upazilas from "../../Data/districts.json";

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const selectedDistrict = districts.find(
      (d) => d.id === selectedDistrictId
    )?.name;

    setDistrict(selectedDistrict); 
    const relatedUpazilas = upazilas.filter(
      (upazila) => upazila.state_id === selectedDistrictId
    );
    setFilteredUpazilas(relatedUpazilas);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      bloodGroup,
      district,
      upazila,
    }).toString();

    try {
      const response = await fetch(`http://localhost:3000/users?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }

      const data = await response.json();
      setDonors(data);
      setIsSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching filtered donors:", error);
    }
  };

  return (
    <div className="pt-20 px-6 sm:px-10">
      <div className="max-w-[1320px] min-h-[480px] mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Search Donors
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-4 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="bloodGroup"
              className="block text-lg font-semibold text-gray-700"
            >
              Blood Group:
            </label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="district"
              className="block text-lg font-semibold text-gray-700"
            >
              State:
            </label>
            <select
              id="district"
              value={districts.find((d) => d.name === district)?.id || ""}
              onChange={handleDistrictChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select State</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="upazila"
              className="block text-lg font-semibold text-gray-700"
            >
              District:
            </label>
            <select
              id="upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select District</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Search
          </button>
        </form>

        {isSearchPerformed && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.length === 0 ? (
              <p className="col-span-full text-center text-lg text-gray-500">
                No donors found.
              </p>
            ) : (
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="p-4 sm:p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md flex flex-col gap-2"
                >
                  <p>
                    <strong className="text-gray-700">Name:</strong>{" "}
                    {donor.name}
                  </p>
                  <p>
                    <strong className="text-gray-700">Blood Group:</strong>{" "}
                    {donor.bloodGroup}
                  </p>
                  <p>
                    <strong className="text-gray-700">State:</strong>{" "}
                    {donor.district}
                  </p>
                  <p>
                    <strong className="text-gray-700">District:</strong>{" "}
                    {donor.upazila}
                  </p>
                  <p>
                    <strong className="text-gray-700">Email:</strong>
                    <a
                      href={`mailto:${donor.email}`}
                      className="text-red-600 hover:underline"
                    >
                      {donor.email}
                    </a>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
