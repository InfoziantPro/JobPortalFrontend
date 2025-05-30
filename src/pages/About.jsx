import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20 font-jost text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">About Us</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About VTA</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Infoziant is at the forefront of transforming the Talent Acquisition and E-learning landscape
          by leveraging AI-driven, unbiased skill validation, expert mentorship, and strategic career
          advancement opportunities. Our platform empowers individuals to achieve their professional
          goals with personalized learning experiences and precise skill assessments. By combining
          cutting-edge technology with decades of industry expertise, we ensure that both learners and
          employers benefit from a streamlined, effective process.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          Our founders, with a collective experience of over 60 years in education, recruitment, and
          product development at industry giants such as Symantec, McAfee, EMC, and HCLTech, have
          designed VTA to meet the evolving needs of a global workforce. We take pride in our diverse
          operations across the United States and India, serving a wide-ranging international clientele.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          VTA's reach extends across the globe, having successfully trained individuals from the US,
          Saudi Arabia, UAE, Australia, Sri Lanka, Malaysia, and India. With a proven track record of
          educating over 28,000+ students online and 19,000+ offline, our team is dedicated to providing
          top-notch training that equips learners with the skills and knowledge necessary to thrive in
          today's competitive job market.
        </p>
      </div>
    </div>
  );
}
