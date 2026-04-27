import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [loading,setLoading]=useState(true)
  
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch published blogs
  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        // Filter published blogs

        setLoading(false)
        setBlogs(response.data.filter(blog => blog.status === "published"));
      })
      .catch((error) => {
        console.error("Error fetching blogs", error);
      });
  }, []);
  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="container mx-auto p-4 mt-14">
      <h2 className="text-4xl font-bold text-red-800 text-center mb-6"> All Published Blogs</h2>

      {/* Search bar (centered) */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {filteredBlogs.map((blog) => (
    <div
      key={blog._id}
      className="p-4 bg-white rounded-lg shadow-md border border-gray-400 flex flex-col justify-between min-h-[400px]"
    >
      <div>
        <img
          src={blog.thumbnail || "/default-thumbnail.jpg"} 
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-bold text-red-600">{blog.title}</h3>
        <p className="text-gray-600 mt-2">{blog.content.slice(0, 150)}...</p>
      </div>
      
      <div className="mt-auto flex justify-center pt-6">
        <button
          onClick={() => navigate(`/blog/${blog._id}`)}
          className="inline-block bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-800"
        >
          Read More
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default BlogPage;
