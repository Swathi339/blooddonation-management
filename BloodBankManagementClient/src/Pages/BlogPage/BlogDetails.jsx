import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center my-10 text-xl text-red-500">
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 pb-10 px-6 md:px-0">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex items-center flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 p-4">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Blog Content Section */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{blog.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            <p>Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
