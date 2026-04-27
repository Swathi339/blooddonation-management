import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const ContentManagement = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // For automatic refetching after delete or update

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`) 
        .then((response) => {
          setUserRole(response.data.role);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(true);
        });
    }
  }, [user]);

  // Fetch blogs
  const { data: blogs, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/blogs");
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching blogs", error);
    },
  });

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePublishToggle = async (blog) => {
    const updatedStatus = blog.status === "draft" ? "published" : "draft";
    try {
      await axios.put(`http://localhost:3000/blogs/${blog._id}`, {
        ...blog,
        status: updatedStatus,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch(); 
    } catch (error) {
      console.error("Error updating blog status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blog Deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch blogs after deleting a blog
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  // Handle pagination
  const totalPages = Math.ceil(blogs?.length / itemsPerPage);
  const currentBlogs = blogs?.filter(blog => {
    if (statusFilter === "") return true;
    return blog.status === statusFilter;
  }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-4 md:p-8 lg:px-12 bg-gray-100">
      <div className="flex justify-between items-center bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold">Blood Bank Content Management</h2>
        <button
          onClick={() => navigate("/dashboard/content-management/add-blog")}
          className="bg-white font-bold text-red-600 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
        >
          Add Blog
        </button>
      </div>

      {/* Filter Section */}
      <div className="my-6">
        <label className="block text-gray-700 font-medium mb-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-red-500"
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {currentBlogs?.map((blog) => (
    <div key={blog._id} className="p-4 bg-white rounded-lg shadow-lg border border-gray-400 flex flex-col">
      <div className="flex items-center">
        <h4
          className={`capitalize inline-block border border-gray-400 px-2 py-1 rounded-lg text-xs font-bold ${
            blog.status === "draft" ? "text-red-500" : "text-green-500"
          }`}
        >
          {blog.status === "draft" ? "Draft" : "Published"}
        </h4>
      </div>
      <h3 className="text-lg font-bold text-red-600">{blog?.title}</h3>
      <p className="text-gray-600 mt-2 flex-grow">{blog?.content.slice(0, 100)}...</p>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300 w-full">
        
        {userRole === "admin" ? (
          <>
            <button
              onClick={() => handlePublishToggle(blog)}
              className={`${
                blog.status === "draft" ? "bg-green-500" : "bg-gray-700"
              } text-white px-3 py-1 rounded-md shadow hover:bg-gray-800 transition`}
            >
              {blog.status === "draft" ? "Publish" : "Unpublish"}
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  ))}
</div>


      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-md shadow ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-md shadow ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentManagement;
