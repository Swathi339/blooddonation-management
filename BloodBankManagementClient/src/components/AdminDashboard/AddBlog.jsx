import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import Swal from 'sweetalert2';
import { htmlToText } from 'html-to-text';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyDBH7RBVRBK9rihWK1ETSwtZH2tm0lwthk",
    authDomain: "eventmanagementsystem-28f3b.firebaseapp.com",
    projectId: "eventmanagementsystem-28f3b",
    storageBucket: "eventmanagementsystem-28f3b.appspot.com",
    messagingSenderId: "963202336197",
    appId: "1:963202336197:web:37b9e066ed18dbaef137ac",
    measurementId: "G-3TE9PMC6V4"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const imagesListRef = ref(storage, "upload/");
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
        console.log(url)
        });
      });
    });
  }, []);



  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageData = new FormData();
        imageData.append("image", file);
        try {
          const imageUpload = file
              
              if (imageUpload == null) return;
              const imageRef = ref(storage, `upload/${imageUpload.name + v4()}`);
              await uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  console.log(url)
                  setThumbnail(url);
                });
              });

           
        } catch (error) {
            console.error("Error uploading thumbnail:", error);
            Swal.fire("Error", "Failed to upload thumbnail.", "error");
        }
    }
};

console.log(thumbnail);


const handleSubmit = async () => {
  if (!thumbnail) {
    return;
}
const plainTextContent = htmlToText(content, {
  wordwrap: false,
});
  const blogData = {
      title,
      content: plainTextContent,
      thumbnail,
      status: "draft",
  };
  try {
      await axios.post("http://localhost:3000/blogs", blogData);
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blog created successfully!",
          showConfirmButton: false,
          timer: 1500,
      });
      navigate("/dashboard/content-management");
  } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire("Error", "Failed to create blog.", "error");
  }
};


  return (
    <div className="max-w-2xl mx-auto bg-white p-6 border border-gray-400 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
        Add Blog
      </h2>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block text-lg font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
         
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
