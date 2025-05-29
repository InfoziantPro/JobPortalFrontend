import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [jobType, setJobType] = useState('Full-time');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to post a job');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/jobs/postjob',
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
      // Clear form
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Post a New Job</h2>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 h-32 resize-none"
        />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Remote">Remote</option>
              <option value="In-person">In-person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Salary From"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="number"
            placeholder="Salary To"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
