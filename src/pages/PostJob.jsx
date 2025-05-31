import { useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [jobType, setJobType] = useState('Full-time');

const [showLocation, setShowLocation] = useState(false);
const [showType, setShowType] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to post a job');
      return;
    }

    try {
      await apiClient.post(
        '/jobs/postjob',
        {
          title,
          description,
          company,
          location,
          salaryRange: {
            from: salaryFrom ? Number(salaryFrom) : undefined,
            to: salaryTo ? Number(salaryTo) : undefined,
          },
          jobType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Job posted successfully!');
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('Remote');
      setSalaryFrom('');
      setSalaryTo('');
      setJobType('Full-time');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to post job');
    }
  };

  return (
    <section className="w-full min-h-screen rounded-xl bg-gradient-to-br from-cyan-100 via-blue-100 to-teal-100 flex items-center justify-center  px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold   bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Post a New Job</h2>
          <p className="text-sm text-gray-600 mt-2">Publish your job opening and reach the right talent</p>
        </div>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 h-28 resize-none"
        />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full px-4 py-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="flex flex-col md:flex-row gap-6">
  {/* Location Dropdown */}
  <div className="w-full relative">
    <label className="block mb-1 text-sm font-medium text-gray-500 ">Location</label>
    <div
      onClick={() => setShowLocation(!showLocation)}
      className={`bg-gray-100 px-4 py-3 rounded-lg cursor-pointer text-sm text-gray-600 transition border ${
        showLocation ? "ring-2 ring-cyan-500 border-blue-300" : "border-gray-300"
      }`}
    >
      {location}
    </div>
    {showLocation && (
      <div className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-md ring-1 ring-gray-300 border border-gray-400">
        {["Remote", "In-person", "Hybrid"].map((loc) => (
          <div
            key={loc}
            onClick={() => {
              setLocation(loc);
              setShowLocation(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-300 cursor-pointer transition"
          >
            {loc}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Job Type Dropdown */}
  <div className="w-full relative">
    <label className="block mb-1 text-sm font-medium text-gray-500">Job Type</label>
    <div
      onClick={() => setShowType(!showType)}
      className={`bg-gray-100 px-4 py-3 rounded-lg cursor-pointer text-sm text-gray-600 transition border ${
        showType ? "ring-2 ring-cyan-500 border-blue-300" : "border-gray-300"
      }`}
    >
      {jobType}
    </div>
    {showType && (
      <div className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-md ring-1 ring-blue-300 border border-gray-400">
        {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
          <div
            key={type}
            onClick={() => {
              setJobType(type);
              setShowType(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-300 cursor-pointer transition"
          >
            {type}
          </div>
        ))}
      </div>
    )}
  </div>
</div>


        <div className="flex gap-6">
          <input
            type="number"
            placeholder="Salary From"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            className="w-full px-4 py-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="Salary To"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            className="w-full px-4 py-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
        >
          Post Job
        </button>
      </form>
    </section>
  );
};

export default PostJob;
