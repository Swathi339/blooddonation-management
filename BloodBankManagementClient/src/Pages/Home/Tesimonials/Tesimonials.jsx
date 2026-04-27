import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import manImg1 from '../../../assets/man1.jpeg'
import manImg2 from '../../../assets/man2.jpg'
import manImg3 from '../../../assets/man3.jpeg'
import manImg4 from '../../../assets/man4.jpg'
import manImg5 from '../../../assets/man5.jpg'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mohammed Ali",
      role: "Recipient, Blood Donation",
      quote: "The blood bank team responded swiftly when I was in a life-threatening condition. Thanks to the donors, I'm alive today. My heart is full of gratitude.",
      image: manImg1,
    },
    {
      name: "Kawsar Ahmed",
      role: "Recipient, Surgery",
      quote: "I needed blood urgently before my surgery. The blood bank was quick and efficient. I will forever be thankful for the donors who saved my life.",
      image: manImg2,
    },
    {
      name: "Limon Rahman",
      role: "Recipient, Accident",
      quote: "After a major accident, I was given another chance at life, all thanks to the selflessness of blood donors. Words cannot express my gratitude.",
      image: manImg3,
    },
    {
      name: "Sadman Kabir",
      role: "Recipient, Blood Donation",
      quote: "The blood I received saved my life during a critical health situation. I'm forever thankful for the incredible donors and the compassionate team.",
      image: manImg4,
    },
    {
      name: "Rahim Uddin",
      role: "Recipient, Surgery",
      quote: "Without the blood donations, I wouldn't have made it through my surgery. Thank you to the donors for the precious gift of life.",
      image: manImg5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="px-6 sm:px-12">
      <div className="max-w-[1320px] mx-auto text-center">
        <h2 className="text-4xl font-semibold text-red-600 mb-6">
          Life-Saving Stories from Blood Recipients
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          These are the heartfelt testimonials from the people whose lives were touched by your generous blood donations. Your gift is truly life-saving.
        </p>

        {/* Testimonials Carousel */}
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-xl shadow-2xl p-8 transition transform hover:scale-105 hover:shadow-xl w-[300px] mx-auto">
                <p className="text-xl text-gray-700 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt="Recipient"
                    className="w-16 h-16 rounded-full border-4 border-red-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-xl">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
