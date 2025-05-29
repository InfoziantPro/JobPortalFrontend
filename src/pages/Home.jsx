import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Image Imports
import unbiasedGif from "../assets/HomePageImg/unbiased-services.gif";
import learningPathGif from "../assets/HomePageImg/Learning-path.gif";
import projectSupportGif from "../assets/HomePageImg/Project-support.gif";
import processGif from "../assets/HomePageImg/process.gif";
import homeBanner from "../assets/HomePageImg/home-banner.png";

import client1 from "../assets/clients/1-1.png";
import client2 from "../assets/clients/1-2.png";
import client3 from "../assets/clients/1-3.png";
import client4 from "../assets/clients/1-4.png";
import client5 from "../assets/clients/1-5.png";
import client6 from "../assets/clients/1-6.png";
import client7 from "../assets/clients/1-7.png";
import client8 from "../assets/clients/1-8.png";
import client9 from "../assets/clients/1-9.png";
import client10 from "../assets/clients/1-10.png";

import avatar1 from "../assets/avatars/testi-img1.png";
import avatar2 from "../assets/avatars/testi-img2.png";
import avatar3 from "../assets/avatars/testi-img3.png";
import avatar4 from "../assets/avatars/testi-img1.png";
import avatar5 from "../assets/avatars/testi-img1.png";


const Home = () => {
const sections = [
  {
    title: "Unique Learning Path",
    gif: learningPathGif,
    reverse: false,
    points: [
      "Chart your course to success",
      "Learn at your own pace, master in-demand skills",
      "Achieve your career goals with personalized guidance",
    ],
  },
  {
    title: "Optimize Your Hiring Process",
    gif: projectSupportGif,
    reverse: true,
    points: [
      "Hire top talent faster with AI-powered insights",
      "Streamline your recruitment, from sourcing to onboarding",
      "Reduce time-to-hire and improve candidate experience",
    ],
  },
  {
    title: "Project Support and Ideation",
    gif: processGif,
    reverse: false,
    points: [
      "Transform your ideas into reality",
      "Get expert guidance and support",
      "Achieve your career goals with personalized guidance",
    ],
  },
];

const [activeCategory, setActiveCategory] = useState("All");
const categories = ["All", "Trending", "Design", "Marketing", "Health"];
  
  return (
  <div className="bg-white">

  <div
  className="bg-center bg-cover bg-no-repeat text-white min-h-screen w-full overflow-hidden flex flex-col items-center justify-between px-4 py-24"
  style={{
    backgroundImage: `url(${homeBanner})`,
  }}>

  {/* Title */}
  <motion.h1
    className="text-4xl md:text-5xl font-semibold text-center leading-tight mb-4 mt-10 drop-shadow-lg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Elevate Your Career with{" "}
    <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
          Infoziant
        </span>{" "}
    - All in one <br />
     Career Catalyst
  </motion.h1>

  {/* Typewriter */}
  <motion.div
    className="text-lg md:text-2xl font-medium text-center mt-2 mb-10 text-gray-100"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 1 }}
  >
    <Typewriter
      options={{
        strings: ["Empowering Individuals and Transforming Organizations"],
        autoStart: true,
        loop: true,
        delay: 40,
        deleteSpeed: 25,
      }}
    />
  </motion.div>

     {/* Search bar */}
      <div className="bg-white text-black rounded-full shadow-lg flex flex-wrap justify-center items-center gap-2 p-4 px-6 w-full max-w-4xl mb-6">
        {/* Search Icon Input */}
  <div className="relative flex-1 min-w-[180px]">
    <img
      src="/icons/search.svg" // Replace with your path or use inline SVG
      alt="Search Icon"
      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
    />
    <input
      type="text"
placeholder="Job title, keywords, or company"
className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
/>
        </div>

  {/* Location Input */}
  <input
type="text"
placeholder="City or postcode"
className="flex-1 min-w-[180px] px-4 py-4 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
  />

  {/* Custom-Styled Select Wrapper */}
  <div className="relative">
        <select
className="appearance-none bg-white text-black border border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
>
          <option>All Categories</option>
<option>Accounting / Finance</option>
      <option>Automotive Jobs</option>
      <option>Customer</option>
      <option>Design</option>
      <option>Development</option>
      <option>Health and Care</option>
      <option>Marketing</option>
      <option>Project Management</option>
        </select>
{/* Custom Arrow Icon */}
    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      ▼
    </div>
  </div>

  {/* Submit Button */}
        <button className="rounded-full px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform">
          Find Jobs
        </button>
      </div>


      {/* Animated Circles */}
      <motion.div
        className="relative w-full max-w-6xl h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {[
      { text: "Boost Your Skills", x: "-7%", y: "78%" },
            { text: "Elevate Your Profile", x: "19.5%", y: "41%" },
            { text: "AI - Powered Job Matching", x: "45.5%", y: "55%" },
            { text: "Mentor Connect", x: "70.5%", y: "90%" },
            { text: "Hiring Reimagined", x: "96%", y: "41%" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center justify-center w-[102px] h-[102px] rounded-full bg-gradient-to-b from-indigo-600 to-purple-700 text-white text-center text-sm shadow-xl border-4 border-white"
              style={{
left: item.x,
top: item.y,
transform: "translate(-50%, -50%)",
}}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.2, duration: 0.8 }}
            >
              <p className="px-3">{item.text}</p>
            </motion.div>
          ))}
              </motion.div>
</div>


      {/* 👇 Separate Scroll Section Starts Here — AFTER full background */}
      <div className="w-full bg-white py-12 overflow-hidden">
        <div className="flex gap-20 px-4 whitespace-nowrap animate-marquee">
          {[...Array(2)].flatMap((_, repeatIdx) =>
            [
              client1,
              client2,
              client3,
              client4,
              client5,
              client6,
              client7,
              client8,
              client9,
              client10,
            ].map((logo, idx) => (
              <img
                key={`${repeatIdx}-${idx}`}
                src={logo}
                alt={`Client ${idx + 1}`}
                className="h-8 inline-block object-contain"
              />
            ))
          )}
        </div>
      </div>

     <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16 bg-violet-950 text-white transition-all duration-700 ease-in-out">
  {/* Left Image or Graphic */}
  <div className="w-full md:w-1/2">
    <img
      src={unbiasedGif}
      alt="Career Services"
      className="w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105"
    />
  </div>

  {/* Right Content */}
  <div className="w-full md:w-1/2">
    <h2 className="text-4xl font-semibold mb-8 transition-opacity duration-700 ease-in-out hover:text-purple-300">
      Unbiased Services to Unlock Your Career Potential
    </h2>

    {/* Steps */}
    <div className="space-y-8 relative">
      {[
        {
          number: 1,
          title: "AI-Powered Job Matching",
          desc: "Find your perfect career fit with our advanced matching algorithms.",
        },
        {
          number: 2,
          title: "Comprehensive Skill Assessments",
          desc: "Identify your strengths and areas for growth.",
        },
        {
          number: 3,
          title: "Expert Mentorship",
          desc: "Gain insights from industry leaders and accelerate your career.",
        },
      ].map((step, index) => (
        <div
          key={index}
          className="flex items-start group transition-all duration-700 ease-in-out hover:scale-[1.03]"
        >
          <div className="flex flex-col items-center mr-4">
            <div className="w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-lg cursor-pointer">
              {step.number}
            </div>
            {index < 2 && <div className="w-px h-16 bg-white mt-1 transition-all duration-300 group-hover:bg-purple-400"></div>}
          </div>
          <div className="transition-all duration-500 group-hover:text-purple-300">
            <h3 className="text-xl font-semibold transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-sm opacity-80 mt-1 transition-opacity duration-300 group-hover:opacity-100">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <button className="mt-10 px-6 py-3 rounded-lg bg-white text-black font-semibold transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-700 hover:text-white shadow-md hover:shadow-xl">
      Get Started Now →
    </button>
  </div>
</div>

<>
  {sections.map((sec, idx) => (
    <section key={idx} className="w-full bg-white">
      <div
        className={`flex flex-col ${
          sec.reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-between py-16 px-6 md:px-20 gap-32 max-w-7xl mx-auto`}
      >
        {/* Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: sec.reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src={sec.gif}
            alt={sec.title}
            className="w-full h-auto object-contain rounded-md shadow-md"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: sec.reverse ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a0052] mb-6">
            {sec.title}
          </h2>
          <ul className="space-y-4 text-gray-700">
            {sec.points.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <span className="text-xl text-green-600">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg font-semibold">
            Discover More
          </button>
        </motion.div>
      </div>
    </section>
  ))}
</>

<section className="w-full bg-violet-950 text-white py-16 px-6 md:px-20 transition-all duration-500">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-12 transition-opacity duration-700">
      Unlock Your Career Potential with Our Comprehensive Features
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Internship and Placements",
          desc: "Gain experience and enhance your skills with top companies.",
        },
        {
          title: "AI-Driven Career Insights",
          desc: "Leverage AI for trends, market data, and tailored career advice.",
        },
        {
          title: "Empowering Institutions",
          desc: "Provide institutions with tools for student achievement.",
        },
      ].map((feature, idx) => (
        <div
          key={idx}
          className="border border-white rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:bg-violet-900 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-300">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

 <div className="bg-white w-full text-black py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Most Popular Jobs
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Know your worth and find the job that qualify your life
        </p>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full transition font-medium ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src="/logo-placeholder.png"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  Software Engineer (Android), Libraries
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span>Segment</span>
                  <span>•</span>
                  <span>London, UK</span>
                  <span>•</span>
                  <span>11 hours ago</span>
                  <span>•</span>
                  <span>$35k - $45k</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-2">
              <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                Full Time
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                Private
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                Urgent
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  <div className="animate-fade-in-up">

      {/* Browse by Category */}
<section className="bg-gradient-to-b from-purple-900 to-purple-950 text-white py-16 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Centered title at the top */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">Browse by Category</h2>
      <p className="text-sm text-purple-200 mt-2">2020 jobs live • 293 added today</p>
    </div>

    {/* Grid of category cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {[
        {
          title: 'Marketing',
          count: 86,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/marketing.png',
        },
        {
          title: 'Design',
          count: 43,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/design.png',
        },
        {
          title: 'Development',
          count: 12,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/source-code.png',
        },
        {
          title: 'Customer Service',
          count: 72,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/customer-support.png',
        },
        {
          title: 'Health and Care',
          count: 25,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/heart-health.png',
        },
        {
          title: 'Automotive Jobs',
          count: 92,
          img: 'https://img.icons8.com/fluency-systems-regular/48/000000/car.png',
        },
      ].map((cat, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-tr from-white to-purple-100 text-black rounded-2xl p-6 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out cursor-pointer"
        >
          <div className="mb-4 w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center">
            <img
              src={cat.img}
              alt={`${cat.title} icon`}
              className="w-7 h-7 filter grayscale"
            />
          </div>
          <h3 className="font-semibold text-base">{cat.title}</h3>
          <p className="text-xs text-gray-600 mt-1">({cat.count} open positions)</p>
        </div>
      ))}
    </div>


    {/* Optional bottom link */}
    <div className="text-center mt-10">
      <a href="#" className="text-sm underline hover:text-white transition">See all categories ↗</a>
    </div>
  </div>
</section>


   {/* Testimonials Section */}
<section className="py-20 px-4 bg-white text-black relative">
  <div className="text-center mb-12">
    <h2 className="text-2xl font-semibold">Testimonials From Our Users</h2>
  </div>

  <div className="relative max-w-4xl mx-auto bg-purple-100 p-10 rounded-3xl text-center shadow-md">
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">

      <img
        src={avatar1}
        alt="User"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
      />
    </div>
    <div className="mt-16">
      <h3 className="font-semibold text-lg mb-2">Great quality!</h3>
      <p className="text-gray-700 text-sm">
        VTA has been a game-changer for my career. The AI-powered job recommendations helped me land my dream job,
        and the skill assessment guided me in upskilling effectively. I love how VTA brings together job searching,
        learning, and mentorship on one platform. It’s my go-to career resource.
      </p>
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Arun Pandi</p>
        <p>Lead Web Developer</p>
      </div>
    </div>
    {/* Pagination dots */}
    <div className="mt-6 flex justify-center gap-2">
      <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
      <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
      <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
    </div>
  </div>

  {/* Floating avatars */}
  <div className="absolute inset-0 pointer-events-none">
    {[
      { src: avatar2, className: 'top-1/4 left-10' },
      { src: avatar3, className: 'top-2/3 left-20' },
      { src: avatar4, className: 'top-1/2 right-10' },
      { src: avatar5, className: 'bottom-20 right-20' },
    ].map((avt, idx) => (
      <img
        key={idx}
        src={avt.src}
        alt={`Avatar ${idx}`}
        className={`w-10 h-10 rounded-full shadow-lg absolute ${avt.className}`}
      />
    ))}
  </div>
</section>


</div>
    </div>
  );
};

export default Home;