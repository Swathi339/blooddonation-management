import { Link } from "react-router-dom";
// import contactImg from "../../../assets/contact-min.jpg";
import contactImg from "../../../assets/Banner-Home.jpg";
import Swal from "sweetalert2";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
const ContactUs = () => {
    const handleContact = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message Sent Successfully",
            text: "Our team will contact you shortly.",
            showConfirmButton: false,
            timer: 2000
        });
        e.target.reset();
    };

    return (
        <section 
            className="bg-cover bg-fixed" 
            style={{ backgroundImage: `url('${contactImg}')` }}
        >
            <div className="flex flex-col items-center justify-center bg-black/50 ">
                <div className="container max-w-[1320px] py-12 mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center px-6 lg:px-0">
                        {/* Left Side Content */}
                        <div className="text-white lg:w-1/2">
                            <h1 className="text-5xl font-semibold capitalize">Donate Blood, Save Lives</h1>
                            <p className="max-w-xl mt-6">
                                Your donation can help save lives. If you have any questions or need assistance, feel free to reach out. 
                                We are here to make the donation process as easy and smooth as possible.
                            </p>
                            <button className="px-8 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-800">
                                Get In Touch
                            </button>
                            <div className="mt-6 md:mt-8">
                        <h3 className="text-gray-300 ">Follow us</h3>

                        <div className="flex mt-4 -mx-1.5 ">
                            <a className="mx-1.5 text-white transition-colors duration-300 transform hover:text-red-500" href="https://www.x.com" target="_blank" rel="noreferrer">
                            <FaTwitter  className="text-3xl"/>

                            </a>

                            <a className="mx-1.5 text-white transition-colors duration-300 transform hover:text-red-500" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                              <FaLinkedin  className="text-3xl" />
                            </a>

                            <a className="mx-1.5 text-white transition-colors duration-300 transform hover:text-red-500" href="https://www.facebook.com" target="_blank" rel="noreferrer">
                               <FaFacebook className="text-3xl"/>
                            </a>

                            <a className="mx-1.5 text-white transition-colors duration-300 transform hover:text-red-500" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                <FaInstagram className="text-3xl"/>
                            </a>
                        </div>
                    </div>
                        </div>

                        {/* Right Side Form */}
                        <div className="mt-8 lg:w-1/2 lg:ml-12">
                            <div className="w-full px-8 py-10 mx-auto bg-red-100/90 shadow-2xl rounded-xl">
                                <h1 className="text-xl font-medium text-gray-800">Contact Form | Send Your Message</h1>
                                <p className="mt-2 text-gray-700">Have any questions regarding blood donation? We would love to hear from you.</p>
                                <form onSubmit={handleContact} className="mt-6">
                                    <div>
                                        <label className="block mb-2 text-sm text-gray-900">Full Name</label>
                                        <input type="text" placeholder="Enter Name" required 
                                            className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                                    </div>
                                    <div className="mt-6">
                                        <label className="block mb-2 text-sm text-gray-900">Email Address</label>
                                        <input type="email" placeholder="Enter Email" required 
                                            className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                                    </div>
                                    <div className="w-full mt-6">
                                        <label className="block mb-2 text-sm text-gray-900">Message</label>
                                        <textarea required 
                                            className="w-full h-32 px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                                            placeholder="Message"></textarea>
                                    </div>
                                    <button type="submit" 
                                        className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50">
                                        Contact Us
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
