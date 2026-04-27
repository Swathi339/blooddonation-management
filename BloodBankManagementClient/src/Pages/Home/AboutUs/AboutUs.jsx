import { Link } from "react-router-dom";
import aboutImg from "../../../assets/banner-high.jpg";

const AboutUs = () => {
  return (
    <section className="max-w-[1320px] mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About Blood Bank"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-md">
            Saving Lives Every Day
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            About <span className="text-red-600">Our Blood Bank</span>
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed text-justify">
            We are committed to saving lives by ensuring a **safe, reliable, and
            accessible** blood supply for those in need. Our **state-of-the-art**
            facilities, trained medical professionals, and dedicated volunteers
            work tirelessly to bridge the gap between donors and recipients.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
              <p className="text-gray-700">24/7 Emergency Blood Support</p>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
              <p className="text-gray-700">100% Safe & Screened Blood Donations</p>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
              <p className="text-gray-700">A Network of Certified Donors</p>
            </div>
          </div>
            <Link to={"/about"}>
          <button className="mt-8 px-8 py-3 text-white bg-red-600 rounded-md hover:bg-red-800 transition-transform hover:scale-105">
            Learn More
          </button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
