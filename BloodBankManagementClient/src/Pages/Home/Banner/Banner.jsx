import { Link } from "react-router-dom";
import bannerImg from "../../../assets/contact-min.jpg";

const Header = () => {
  return (
    <header
      className="relative w-full h-[500px] md:h-[600px] lg:h-[830px] bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[5px]"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1320px] px-6 text-center text-white">
        <h2 className="text-4xl font-extrabold lg:text-7xl drop-shadow-md">
          Be a Hero:
          <span className=" "> Donate Blood, <br />Save Lives</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg lg:text-xl font-medium text-white drop-shadow-md">
          Every drop counts. Join our mission to connect life-saving donors with those in need.
          Together, we can make a lasting impact and save countless lives.
        </p>

        {/* Button Section */}
        <div className="flex flex-col items-center justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <Link
            to="/register"
            className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-lg transition duration-300 hover:bg-red-900"
          >
            Join as a Donor
          </Link>
          <Link
            to="/search"
            className="px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg shadow-lg transition duration-300 hover:bg-gray-800"
          >
            Search Donors
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
