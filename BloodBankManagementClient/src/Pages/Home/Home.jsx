import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import Banner from '../Home/Banner/Banner.jsx'
import ContactUs from './ContactUs/ContactUs.jsx';
import FeaturedBloodTypes from './FeaturedSection/FeaturedBloodTypes.jsx';
import Testimonials from './Tesimonials/Tesimonials.jsx';
import DonationRequests from '../DonationRequest/DonationRequest.jsx';
import Blog from './Blog/Blog.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
const Home = () => {
    const { user,loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />
      }
    return (
        <div>
            <div className='lg:pt-10'>
            <Banner></Banner>
            </div>
            <div className='pt-20'>
                <FeaturedBloodTypes></FeaturedBloodTypes>
            </div>
            <div className='pt-6'>
               <DonationRequests></DonationRequests>
            </div>
            <div className='py-20'>
            <Testimonials></Testimonials>
            </div>
            <div className=''>
            <Blog></Blog>
            </div>
            <div className=''>
            <AboutUs></AboutUs>
            </div>
            <div  className='py-12'>
            <ContactUs></ContactUs>
            </div>
        </div>
    );
};

export default Home;