import icon from "../../assets/logo.jpg";
import image from "../../assets/bandage-with-heart-it.jpg";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const email = e.target.email.value;
    const password = e.target.password.value;
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate(location?.state ? location.state : "/");
        }, 500);
      })
      .catch((error) => {
        setIsLoading(false); 
        Swal.fire({
          icon: "error",
          title: "Invalid email or password!",
          text: "Please Provide valid information..",
        });
      });
  };

  return (
    <div className="flex w-full max-w-lg mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      {/* Background Image Section */}
      <div
        className="hidden bg-cover object-fill lg:block lg:w-1/2"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>

      {/* Form Section */}
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        {/* Logo */}
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-32 sm:h-40" src={icon} alt="Logo" />
        </div>

        {/* Welcome Message */}
        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        {/* Email Input */}
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Password
              </label>
            </div>
            <input
              name="password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="mt-2 ml-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Show Password
                </span>
              </label>
            </div>
          </div>

         {/* Sign-In Button */}
          <div className="mt-6">
            <button
              disabled={isLoading} 
              className={`w-full px-6 py-3 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill= "currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 000 8H4z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Sign-Up Link */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            Create New Account ?
          </Link>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
