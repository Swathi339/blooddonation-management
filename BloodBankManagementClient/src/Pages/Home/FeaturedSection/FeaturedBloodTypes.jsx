import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedBloodTypes = () => {
  return (
    <div className="max-w-[1320px] mx-auto py-10 px-5 bg-gradient-to-r from-red-300 via-red-200 to-red-200 text-white rounded-lg  text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-red-700">Featured Blood Types</h2>
      <p className="text-base md:text-lg mb-8">Save a Life Today – Find the Perfect Match</p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg w-40 md:w-52 shadow-md">
          <h3 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">A+</h3>
          <p className="text-sm md:text-base text-gray-600">In high demand for surgeries and trauma care.</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg w-40 md:w-52 shadow-md">
          <h3 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">O-</h3>
          <p className="text-sm md:text-base text-gray-600">Universal donor; always needed in emergencies.</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg w-40 md:w-52 shadow-md">
          <h3 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">B+</h3>
          <p className="text-sm md:text-base text-gray-600">Essential for various patient treatments.</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg w-40 md:w-52 shadow-md">
          <h3 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">AB+</h3>
          <p className="text-sm md:text-base text-gray-600">Can receive from all blood types; help is always needed.</p>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/donation-request">
          <button className="px-4 py-2 md:px-6 md:py-2.5 bg-red-600 text-white rounded-lg text-sm md:text-lg hover:bg-red-900 transition-colors">
            Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBloodTypes;
