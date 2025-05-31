import { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../api/apiClient';

const JobList = () => {
  const [showLocationOptions, setShowLocationOptions] = useState(false);
const [showJobTypeOptions, setShowJobTypeOptions] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    jobType: '',
    isActive: true,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/jobs/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (job) => {
    setSelectedJob(job);
    setEditForm({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      jobType: job.jobType,
      isActive: job.isActive,
    });
  };

  const closeEdit = () => setSelectedJob(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/jobs/${selectedJob._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Job updated successfully');
      closeEdit();
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update job');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`/api/jobs/${selectedJob._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Job deleted successfully');
      closeEdit();
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete job');
    }
  };

  const colorSets = [
    'from-cyan-500 to-blue-500',
    'from-teal-500 to-cyan-600',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-red-500',
    'from-emerald-500 to-green-500',
  ];

  if (loading) return <p className="text-center py-10 text-blue-600">Loading jobs...</p>;
  if (!jobs.length) return <p className="text-center py-10 text-gray-600">No jobs available.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-100 to-teal-50 py-12 px-4">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-12 drop-shadow-md">
        Your Job Posts
      </h2>

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {jobs.map((job, index) => {
          const gradient = colorSets[index % colorSets.length];
          const defaultInitial = job.company?.[0]?.toUpperCase() || 'J';

          return (
            <li
              key={job._id}
              onClick={() => openEdit(job)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl border border-gray-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} text-white flex items-center justify-center text-lg font-bold`}>
                  {job.logo ? (
                    <img src={job.logo} alt="logo" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    defaultInitial
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /></svg>
                  {job.jobType}
                </div>
                <p className="text-gray-500">{job.description.substring(0, 80)}...</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.location}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.jobType}</span>
                <span className={`px-2 py-1 rounded-full ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

     {selectedJob && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
      <h3 className="text-3xl font-extrabold text-center bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent mb-8">
        Edit Job Post
      </h3>

      <div className="space-y-5 text-sm">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Title</label>
          <input
            name="title"
            value={editForm.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Company</label>
          <input
            name="company"
            value={editForm.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
  <label className="block text-gray-600 font-medium mb-1">Location</label>
  <div className="relative">
    <div
      onClick={() => setShowLocationOptions(!showLocationOptions)}
      className={`bg-gray-100 px-4 py-3 rounded-lg cursor-pointer text-sm text-gray-600 transition border ${
        showLocationOptions
          ? 'ring-2 ring-cyan-500 border-blue-300'
          : 'border-gray-300'
      }`}
    >
      {editForm.location || 'Select Location'}
    </div>
    {showLocationOptions && (
      <div className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-md ring-1 ring-gray-300 border border-gray-400">
        {['Remote', 'In-Person', 'Hybrid'].map((loc) => (
          <div
            key={loc}
            onClick={() => {
              setEditForm((prev) => ({ ...prev, location: loc }));
              setShowLocationOptions(false);
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-300 cursor-pointer transition"
          >
            {loc}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

<div className="mt-5">
  <label className="block text-gray-600 font-medium mb-1">Job Type</label>
  <div className="relative">
    <div
      onClick={() => setShowJobTypeOptions(!showJobTypeOptions)}
      className={`bg-gray-100 px-4 py-3 rounded-lg cursor-pointer text-sm text-gray-600 transition border ${
        showJobTypeOptions
          ? 'ring-2 ring-cyan-500 border-blue-300'
          : 'border-gray-300'
      }`}
    >
      {editForm.jobType || 'Select Job Type'}
    </div>
    {showJobTypeOptions && (
      <div className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-md ring-1 ring-gray-300 border border-gray-400">
        {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
          <div
            key={type}
            onClick={() => {
              setEditForm((prev) => ({ ...prev, jobType: type }));
              setShowJobTypeOptions(false);
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

        <div>
          <label className="block text-gray-600 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleChange}
            rows={4}
            placeholder="Job Description"
            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            name="isActive"
            checked={editForm.isActive}
            onChange={handleChange}
            className="accent-cyan-500 w-4 h-4"
          />
          <span className="ml-2 text-gray-700">Job is currently active</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={handleUpdate}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={closeEdit}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default JobList;
