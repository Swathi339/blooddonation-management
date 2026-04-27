import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Error from "../components/ErrorPage/Error";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import FundingPage from "../Pages/Home/FundingPage/FundingPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import BlogPage from "../Pages/BlogPage/BlogPage";
import AdminHome from "../components/AdminDashboard/AdminHome";
import AllUsers from "../components/AdminDashboard/AllUsers";
import CreateDonationRequest from "../components/DonorDashboard/CreateDonationRequest";
import MyDonationRequests from "../components/DonorDashboard/MyDonationRequests";
import UserProfileDashboard from "../components/SharedDashbard/UserProfileDashboard";
import AllDonationRequest from "../components/AdminDashboard/AllDonationRequest";
import ContentManagement from "../components/AdminDashboard/ContentManagement";
import AddBlog from "../components/AdminDashboard/AddBlog";
import BlogDetails from "../Pages/BlogPage/BlogDetails";
import DonationRequestDetails from "../Pages/DonationRequest/DonationRequestDetails";
import DashboardDonationRequestDetails from "../components/DonorDashboard/DashbardDonationRequestDetails";
import EditDonationRequest from "../components/DonorDashboard/EditDonationRequest";
import AboutUsPage from "../Pages/AboutUs/AboutUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/funding",
        element: (
            <FundingPage></FundingPage>
         
        ),
      },
      {
        path: "/donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/donation-request/:id",
        element: <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>,
      },
      {
        path: "/dashboard-donation-request/:id",
        element: <PrivateRoute><DashboardDonationRequestDetails></DashboardDonationRequestDetails></PrivateRoute>,
      },
      {
        path: "/edit-donation-request/:id",
        element: <PrivateRoute><EditDonationRequest></EditDonationRequest></PrivateRoute>,
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
        
      },
      {
        path: "/about",
        element: <AboutUsPage></AboutUsPage>,
        
      },
      {
        path:"/blog/:id",
         element:<BlogDetails/>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: 
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
      children: [
        {
          path: "",
          element: <AdminHome></AdminHome>,
        },
        {
          path: "all-blood-donation-request",
          element: <AllDonationRequest></AllDonationRequest>,
        
        },
        {
          path: "content-management",
          element: <ContentManagement></ContentManagement>,
        },
        {
          path: "content-management/add-blog",
          element: <AddBlog></AddBlog>,
        },
        {
          path: "all-users",
          element: <AllUsers></AllUsers>,
        },
        {
          path:"create-donation-request",
          element:<CreateDonationRequest></CreateDonationRequest>
        },
        {
          path:"my-donation-request",
          element:<MyDonationRequests></MyDonationRequests>
        },
        {
          path:"profile",
          element:<UserProfileDashboard></UserProfileDashboard>
        }
      ]
    
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
