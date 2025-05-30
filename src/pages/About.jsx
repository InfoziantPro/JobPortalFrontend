import React from 'react';
import CountUp from 'react-countup';
import client1 from "../assets/clients/1-1.png";
import client2 from "../assets/clients/1-2.png";
import client3 from "../assets/clients/1-3.png";
import client4 from "../assets/clients/1-4.png";
import client5 from "../assets/clients/1-5.png";
import client6 from "../assets/clients/1-6.png";
import img1 from "../assets/avatars/Illustration.png";

export default function About() {
  return (
    <div className="font-jost text-gray-900">

      {/* ===== Hero Image and Stats ===== */}
      <div className="bg-white py-12 px-6 md:px-20 text-center">
        <div className="w-full mb-10">
          <img src={img1} alt="visual-1" className="w-full object-cover rounded-xl shadow-md" />
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center text-center text-lg font-medium text-gray-800">
          <div className="mb-6 md:mb-0">
            <div className="text-3xl font-bold text-black">
              <CountUp end={3000} duration={2.5} suffix="+" />
            </div>
            <div>Job Seekers</div>
          </div>
          <div className="mb-6 md:mb-0">
            <div className="text-3xl font-bold text-black">
              <CountUp end={100} duration={2.5} suffix="+" />
            </div>
            <div>Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">
              <CountUp end={1000} duration={2.5} suffix="+" />
            </div>
            <div>Recruiters</div>
          </div>
        </div>
      </div>

      {/* ===== About VTA Section ===== */}
      <div className="bg-white py-12 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-jost mb-6 text-left text-black">About VTA</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          Infoziant is at the forefront of transforming the Talent Acquisition and E-learning landscape by leveraging AI-driven, unbiased skill validation, expert mentorship, and strategic career advancement opportunities. Our platform empowers individuals to achieve their professional goals with personalized learning experiences and precise skill assessments.
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          Our founders, with a collective experience of over 60 years in education, recruitment, and product development at industry giants such as Symantec, McAfee, EMC, and HCLTech, have designed VTA to meet the evolving needs of a global workforce.
        </p>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
          VTA's reach extends across the globe, having successfully trained individuals from the US, Saudi Arabia, UAE, Australia, Sri Lanka, Malaysia, and India. With a proven track record of educating over 28,000+ students online and 19,000+ offline, our team is dedicated to providing top-notch training that equips learners with the skills and knowledge necessary to thrive in today’s competitive job market.
        </p>
      </div>

      {/* ===== Client Logos ===== */}
      <div className="bg-white py-10">
        <div className="flex flex-wrap justify-center items-center gap-10 px-6">
          {[client1, client2, client3, client4, client5, client6].map((logo, i) => (
            <img key={i} src={logo} alt={`client-${i}`} className="h-10 object-contain" />
          ))}
        </div>
      </div>

      {/* ===== Call to Action Section ===== */}
      <div className="bg-gradient-to-r from-teal-500 via-indigo-700 to-teal-500 text-white py-16 text-center px-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">Your Dream Jobs Are Waiting</h3>
        <p className="mb-8 text-lg">Over 1 million interactions, 50,000 success stories. Make yours now.</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Search Job
          </button>
          <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition">
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
}
