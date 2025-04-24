import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./About.css"; 
import image from "../Images/man.png";
import tt from "../Images/woman.png";
import h from '../Images/photo_2025-03-06_17-24-28.jpg';
import t from "../Images/photo_2025-03-06_17-24-24.jpg";
import ss from "../Images/womann.png"
import ff from '../Images/womannn.png'
import e from '../Images/mannn.png'
import w from '../Images/mannnnn.png'
import hh from  '../Images/photo_2024-12-17_20-14-10.jpg'

const testimonialsData = [
    {
      name: "gehad",
      comment: "An amazing platform for book lovers! I always find my next favorite read here.",
      rating: 5,
      profile: h,
    },
    {
      name: "Mennah",
      comment: "A great resource that helped me discover books I would have never found otherwise!",
      rating: 5,
      profile: ss,
    },
    {
      name: "Remonda",
      comment: "User-friendly and filled with amazing recommendations. Highly recommended!",
      rating: 5,
      profile: ff,
    },
    {
      name: "Hanaa",
      comment: "I love how the website personalizes book suggestions based on my taste.",
      rating: 5,
      profile: t,
    },
    {
      name: "Salma",
      comment: "A fantastic place to browse and borrow books with ease. It made my reading journey much smoother!",
      rating: 5,
      profile: tt,
    },
    {
      name: "Mohammed",
      comment: "Very helpful! The reviews and ratings guide me towards books I truly enjoy.",
      rating: 5,
      profile: image,
    },
    {
      name: "Marwan",
      comment: "The borrowing feature is a game-changer! No need to buy every book I want to read.",
      rating: 5,
      profile: w,
    },
    {
      name: "Ahmed",
      comment: "I had an incredible experience with this platform. Highly recommended for all book enthusiasts!",
      rating: 5,
      profile: e,
    },
  ];
  

const About = () => {
  return (
    <div className="testimonials">
      <h2>See what customers are saying</h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={Math.floor(testimonialsData.length / 2)} 
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="testimonial-slider"
      >
        {testimonialsData.map((testimonial, index) => (
          <SwiperSlide key={index} className="testimonial-card">
            <img
              src={testimonial.profile}
              alt={`${testimonial.name}'s profile`}
              className="profile-image"
            />
            <h3>{testimonial.name}</h3>
            <p>{testimonial.comment}</p>
            <div className="rating">
              {"★".repeat(testimonial.rating)}{" "}
              {"☆".repeat(5 - testimonial.rating)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div id="about" className="about-container">
        <div className="aboutt">
          <div className="abouty">
            <h1>ABOUT  <span>US </span></h1>
          </div>
          <div className="paragh">
          <p>
  Welcome to <strong>IQRAA</strong>! Our mission is to transform the way readers
  discover, purchase, and borrow books in today’s digital age. We believe in
  creating a community where literature thrives, ensuring every reader finds their
  next favorite book.
</p>

<p>
  Our website offers a user-friendly platform that prioritizes
  personalized experiences. With seamless authentication and powerful search
  options for both purchasing and borrowing books, we strive to make your literary
  journey effortless and enjoyable.
</p>

<p>
  We take pride in providing tailored book recommendations based
  on your unique tastes and reading habits. Our curated suggestions, combined with
  user-generated ratings and reviews, help you discover content that truly resonates
  with you.
</p>

<p>
  Join us in revolutionizing the reading experience , making it
  more engaging, interactive, and enjoyable for everyone.
</p>

<p>Happy reading!</p>
</div>

        </div>
        <div className='imagee'>
        <img src={hh} alt="About us" />
        </div>
      </div>
    </div>
  );
};

export default About;



