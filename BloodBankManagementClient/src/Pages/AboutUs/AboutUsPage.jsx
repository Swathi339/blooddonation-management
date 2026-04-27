import { Link } from "react-router-dom";
import aboutImg from "../../assets/Banner-high.jpg";
import missionImg from "../../assets/contact-min.jpg";
import { FaHeartbeat, FaHandsHelping, FaUsers } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-6 md:px-0 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">
          About <span className="text-red-600">Us</span>
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          We are a dedicated team committed to ensuring a **safe and accessible blood supply** for those in need.
        </p>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={aboutImg} alt="About Blood Bank" className="w-full h-auto rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-md">
            Saving Lives Every Day
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            Who <span className="text-red-600">We Are</span>
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our **mission** is to ensure a **safe, sufficient, and timely** blood supply for medical emergencies. We connect **voluntary donors** with those in urgent need through our **trusted network**.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <FaHeartbeat className="text-red-600 text-xl mr-3" />
              <p className="text-gray-700">24/7 Emergency Blood Support</p>
            </li>
            <li className="flex items-center">
              <FaHandsHelping className="text-red-600 text-xl mr-3" />
              <p className="text-gray-700">Safe & Screened Blood Donations</p>
            </li>
            <li className="flex items-center">
              <FaUsers className="text-red-600 text-xl mr-3" />
              <p className="text-gray-700">A Trusted Network of Donors</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            Our <span className="text-red-600">Mission</span>
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            We are dedicated to **saving lives** by ensuring **safe, accessible, and efficient** blood donation and transfusion services. Our goal is to **educate, empower, and connect** communities for a healthier future.
          </p>
          <Link to="/donation-request">
          <button className="mt-6 px-8 py-3 text-white bg-red-600 rounded-md hover:bg-red-800 transition-transform hover:scale-105">
            Donation Requests
          </button>
          </Link>
        </div>
        <img src={missionImg} alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" />
      
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-red-600 text-white text-center py-12 px-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold">Join Us in Saving Lives!</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Become a donor today and help save lives in your community. Every drop counts!
        </p>
        <Link to="/register">
        <button className="mt-6 px-8 py-3 bg-white text-red-600 rounded-md hover:bg-gray-100 transition-transform hover:scale-105">
          Become a Donor
        </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUsPage;
