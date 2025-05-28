import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { useState } from 'react';

const Home = () => {
  
  return (
  <div className="bg-gradient-to-b from-[#2a0052] to-[#450e8e] text-white min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
   {/* Title */}
     <motion.h1
  className="text-4xl md:text-5xl font-medium text-center leading-snug mb-4 mt-10"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Elevate Your Career with{' '}
  <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent ">
    Infoziant
  </span>{' '}
  - All in one Career <br />
  Catalyst
</motion.h1>

      {/* Typewriter effect */}
      <motion.div
        className="text-lg md:text-xl font-medium text-center mt-2 mb-10"
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
      <div className="bg-white text-black rounded-full shadow-lg flex flex-wrap justify-center items-center gap-2 p-4 px-6 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="flex-1 min-w-[180px] px-4 py-2 rounded-full border border-gray-300 outline-none"
        />
        <input
          type="text"
          placeholder="City or postcode"
          className="flex-1 min-w-[180px] px-4 py-2 rounded-full border border-gray-300 outline-none"
        />
        <select className="rounded-full px-4 py-2 border border-gray-300 min-w-[150px]">
          <option>All Categories</option>
        </select>
        <button className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform">
          Find Jobs
        </button>
      </div>

      {/* Image section */}
      <motion.div
        className="mt-10 max-w-5xl w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <img
  src="src\assets\HomePageImg\home-banner-icon.png"
  alt="Career illustration"
  className="w-full h-[400px] object-cover rounded-xl shadow-lg mt-12"
/>
{/* Animated Circles Section */}
<div className="relative mt-24 w-full max-w-6xl h-[300px]">
  {[
    { text: "Boost Your Skills", x: "-40%", y: "10%" },
    { text: "Elevate Your Profile", x: "-20%", y: "-20%" },
    { text: "AI - Powered Job Matching", x: "0%", y: "-30%" },
    { text: "Mentor Connect", x: "20%", y: "-20%" },
    { text: "Hiring Reimagined", x: "40%", y: "10%" },
  ].map((item, index) => (
    <motion.div
      key={index}
      className="absolute flex flex-col items-center justify-center w-[140px] h-[140px] rounded-full bg-gradient-to-b from-indigo-600 to-purple-700 text-white text-center text-sm shadow-xl border-4 border-white"
      style={{
        left: `50%`,
        top: `50%`,
        transform: `translate(${item.x}, ${item.y})`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 + index * 0.2, duration: 0.8 }}
    >
      <p className="px-3">{item.text}</p>
    </motion.div>
  ))}
</div>
      </motion.div>


{/* Company Logos */}
<div className="w-full bg-white py-12 overflow-hidden">
  <div className="flex gap-20 px-4 whitespace-nowrap animate-marquee">
    {/* Repeat the logo list twice to make it loop seamlessly */}
    {[...Array(2)].flatMap((_, repeatIdx) =>
      [
        { src: "src/assets/clients/1-1.png", alt: "Virtusa" },
        { src: "src/assets/clients/1-2.png", alt: "Aspire" },
        { src: "src/assets/clients/1-3.png", alt: "Keenan" },
        { src: "src/assets/clients/1-4.png", alt: "Amazon" },
        { src: "src/assets/clients/1-5.png", alt: "Swipelah" },
        { src: "src/assets/clients/1-6.png", alt: "Pro7 Analytics" },
        { src: "src/assets/clients/1-7.png", alt: "TechMango" },
        { src: "src/assets/clients/1-8.png", alt: "Apptivo" },
        { src: "src/assets/clients/1-9.png", alt: "Grootan" },
        { src: "src/assets/clients/1-10.png", alt: "Dymax" },
      ].map((logo, idx) => (
        <img
          key={`${repeatIdx}-${idx}`}
          src={logo.src}
          alt={logo.alt}
          className="h-8 inline-block object-contain"
        />
      ))
    )}
  </div>
</div>



<div className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16  text-white">
  {/* Left Image or Graphic */}
  <div className="w-full md:w-1/2">
    <img src="src\assets\HomePageImg\unbiased-services.gif" alt="Career Services" className="w-full h-auto" />
  </div>

  {/* Right Content */}
  <div className="w-full md:w-1/2">
    <h2 className="text-4xl font-semibold mb-8">
      Unbiased Services to Unlock Your Career Potential
    </h2>

    {/* Steps */}
    <div className="space-y-8 relative">
      {[
        {
          number: 1,
          title: 'AI-Powered Job Matching',
          desc: 'Find your perfect career fit with our advanced matching algorithms.'
        },
        {
          number: 2,
          title: 'Comprehensive Skill Assessments',
          desc: 'Identify your strengths and areas for growth.'
        },
        {
          number: 3,
          title: 'Expert Mentorship',
          desc: 'Gain insights from industry leaders and accelerate your career.'
        }
      ].map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
  className="w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-500 hover:text-white hover:shadow-lg cursor-pointer"
>
  {step.number}
</div>

            {index < 2 && (
              <div className="w-px h-16 bg-white mt-1"></div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-sm opacity-80 mt-1">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Call to Action Button */}
    <button className="mt-10 px-6 py-3 rounded-lg bg-white text-black hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-700 transition-all duration-300">
      Get Started Now →
    </button>
  </div>
</div>



<section className="w-full bg-white">
  <div className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 gap-12 max-w-7xl mx-auto">
    
    {/* Left: Image */}
    <div className="flex-1">
      <img
        src="src\assets\HomePageImg\Learning-path.gif"
        alt="Learning Path Illustration"
        className="w-full h-auto object-contain"
      />
    </div>

    {/* Right: Text Content */}
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2a0052] mb-6">
        Unique Learning Path
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Chart your course to success</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Learn at your own pace, master in-demand skills</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Achieve your career goals with personalized guidance</span>
        </li>
      </ul>
      <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg transition duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700">
  Discover More
</button>
    </div>
  </div>
</section>



<section className="w-full bg-white">
  <div className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 gap-12 max-w-7xl mx-auto">
    
    {/* Left: Text Content */}
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2a0052] mb-6">
      Optimize Your Hiring Process
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Hire top talent faster with AI-powered insights</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Streamline your recruitment, from sourcing to onboarding</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Reduce time-to-hire and improve candidate experience</span>
        </li>
      </ul>
      <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg transition duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700">
  Discover More
</button>

    </div>

     {/* Right: Image */}
    <div className="flex-1">
      <img
        src="src\assets\HomePageImg\Project-support.gif"
        alt="Project Support"
        className="w-full h-auto object-contain"
      />
    </div>

  </div>
</section>




<section className="w-full bg-white">
  <div className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 gap-12 max-w-7xl mx-auto">
    
    {/* Left: Image */}
    <div className="flex-1">
      <img
        src="src\assets\HomePageImg\process.gif"
        alt="Hiring Process"
        className="w-full h-auto object-contain"
      />
    </div>

    {/* Right: Text Content */}
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2a0052] mb-6">
        Project Support and
Ideation
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Transform your ideas into reality</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Get expert guidance and support</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-xl text-green-600">✓</span>
          <span>Achieve your career goals with personalized guidance</span>
        </li>
      </ul>
      <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg transition duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700">
  Discover More
</button>
    </div>
  </div>
</section>


<div className=" text-white py-16 px-8 text-center">
  <h2 className="text-3xl md:text-4xl font-semibold mb-12">
    Unlock Your Career Potential with Our Comprehensive Features
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <div className="border border-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Internship and Placements</h3>
      <p className="text-sm opacity-80">
        Gain experience and enhance your skills with top companies.
      </p>
    </div>
    <div className="border border-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">AI-Driven Career Insights</h3>
      <p className="text-sm opacity-80">
        Leverage AI for trends, market data, and tailored career advice.
      </p>
    </div>
    <div className="border border-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Empowering Institutions</h3>
      <p className="text-sm opacity-80">
        Provide institutions with tools for student achievement.
      </p>
    </div>
  </div>
</div>



<div className="bg-white w-full text-black py-16 px-8">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-semibold">Most Popular Jobs</h2>
    <p className="text-sm text-gray-500 mt-2">Know your worth and find the job that qualify your life</p>

    {/* Filter Chips */}
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {["All", "Trending", "Design", "Marketing", "Health"].map((cat, idx) => (
        <button
          key={idx}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          {cat}
        </button>
      ))}
    </div>
  </div>

  {/* Job Listings Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
    {[1, 2, 3, 4, 5].map((_, i) => (
      <div key={i} className="border border-gray-200 rounded-lg p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-4">
          <img src="/logo-placeholder.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold">Software Engineer (Android), Libraries</h3>
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
          <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">Full Time</span>
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">Private</span>
          <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">Urgent</span>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Browse by Category Section */}
<section className=" text-white px-10 py-12">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Browse by Category</h2>
    <span className="text-sm text-gray-300">2020 jobs live • 293 added today.</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {[
      { title: "Marketing", count: 86, icon: "https://cdn-icons-png.flaticon.com/512/263/263115.png" },
      { title: "Design", count: 43, icon: "https://cdn-icons-png.flaticon.com/512/753/753345.png" },
      { title: "Development", count: 12, icon: "https://cdn-icons-png.flaticon.com/512/888/888879.png" },
      { title: "Customer Service", count: 72, icon: "https://cdn-icons-png.flaticon.com/512/2721/2721238.png" },
      { title: "Health and Care", count: 25, icon: "https://cdn-icons-png.flaticon.com/512/899/899735.png" },
      { title: "Automotive Jobs", count: 92, icon: "https://cdn-icons-png.flaticon.com/512/833/833281.png" },
    ].map(({ title, count, icon }) => (
      <div key={title} className="bg-white text-center rounded-xl p-6 text-black shadow">
        <img src={icon} alt={title} className="h-10 mx-auto mb-2" />
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500">({count} open positions)</div>
      </div>
    ))}
  </div>
</section>

{/* Testimonials Section */}
<section className="bg-white w-full text-black py-16 px-6 relative">
  <h2 className="text-2xl font-bold text-center mb-10">Testimonials From Our Users</h2>
  <div className="max-w-3xl mx-auto text-center bg-purple-100 rounded-3xl p-10 shadow-lg relative z-10">
    <img
      src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
      className="h-16 w-16 rounded-full mx-auto -mt-20 border-4 border-white shadow-md"
      alt="User"
    />
    <h3 className="font-semibold mt-4">Great quality!</h3>
    <p className="mt-2 text-sm text-gray-700">
      VTA has been a game-changer for my career. The AI-powered job recommendations helped me land my dream job, and
      the skill assessment guided me in upskilling effectively. I love how VTA brings together job searching,
      learning, and mentorship on one platform. It’s my go-to career resource.
    </p>
    <div className="mt-4 text-purple-800 font-bold">Arun Pandi</div>
    <div className="text-xs text-gray-600">Lead Web Developer</div>
  </div>

  {/* Floating bubble avatars */}
  <img
    src="https://cdn-icons-png.flaticon.com/512/921/921089.png"
    className="w-10 h-10 rounded-full border-2 border-white shadow absolute left-10 top-2/3 transform -translate-y-1/2"
    alt="Avatar"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
    className="w-10 h-10 rounded-full border-2 border-white shadow absolute right-10 top-2/3 transform -translate-y-1/2"
    alt="Avatar"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
    className="w-10 h-10 rounded-full border-2 border-white shadow absolute left-1/4 bottom-6"
    alt="Avatar"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png"
    className="w-10 h-10 rounded-full border-2 border-white shadow absolute right-1/4 bottom-6"
    alt="Avatar"
  />
</section>



    </div>
  );
};

export default Home;
