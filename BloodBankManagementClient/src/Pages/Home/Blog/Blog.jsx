import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        setBlogs(response.data.filter((blog) => blog.status === "published"));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching blogs", error));
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="max-w-[1320px] mx-auto pb-12 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        Latest <span className="text-red-600">Blogs</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left-Side Blog (Full Details, Full Height) */}
        <div className="md:col-span-2 flex flex-col">
          {filteredBlogs.length > 0 && (
            <div className="h-auto md:h-[640px] rounded-lg shadow-lg overflow-hidden bg-white border flex flex-col">
              <img
                src={filteredBlogs[0].thumbnail || "/default-thumbnail.jpg"}
                alt={filteredBlogs[0].title}
                className="w-full h-auto md:h-[280px] object-cover transition-transform transform hover:scale-105 duration-300"
              />
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
                  {filteredBlogs[0].title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed flex-grow">
                  {filteredBlogs[0].content}
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => navigate(`/blog/${filteredBlogs[0]._id}`)}
                    className="px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right-Side Blogs (Less Details, Balanced) */}
        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4">
          {filteredBlogs.slice(1, 3).map((blog) => (
            <div
              key={blog._id}
              className="h-auto md:h-[312px] rounded-lg shadow-md overflow-hidden bg-white border flex flex-col"
            >
              <img
                src={blog.thumbnail || "/default-thumbnail.jpg"}
                alt={blog.title}
                className="w-full h-auto md:h-[180px] object-cover transition-transform transform hover:scale-105"
              />
              <div className="px-4 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                {/* Flex row for content and button */}
                <div className="flex flex-col md:flex-row justify-between items-end flex-grow gap-2 mb-4">
                  <p className="text-gray-600 text-sm md:text-base flex-grow">
                    {blog.content.slice(0, 80)}...
                  </p>
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300 flex-shrink-0"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Blogs Button */}
      <div className="text-center mt-6">
        <Link to="/blog">
          <button className="px-6 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300">
            View All Blogs
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Blog;
