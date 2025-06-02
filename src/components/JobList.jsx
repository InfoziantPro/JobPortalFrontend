import { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../api/apiClient';

const JobList = ({ user }) => {
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

  const role = user?.role?.toLowerCase(); 

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/jobs/all', {
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
      });
      alert('Job deleted successfully');
      closeEdit();
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete job');
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => openEdit(job)}
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.company} • {job.location}
            </p>
            <p className="mt-2">{job.description.substring(0, 100)}...</p>
            <p className="text-sm mt-1">Type: {job.jobType}</p>
            {job.postedBy && (
              <p className="text-xs text-gray-500 mt-2">
                Posted by: <span className="font-medium">{job.postedBy.name}</span> ({job.postedBy.email})
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">Edit Job</h3>
            <p className="text-sm text-gray-500">Current Role: {role}</p>

            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Company</label>
            <input
              type="text"
              name="company"
              value={editForm.company}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2 font-semibold">Location</label>
            <select
              name="location"
              value={editForm.location}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Location</option>
              <option value="Remote">Remote</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <label className="block mb-2 font-semibold">Job Type</label>
            <select
              name="jobType"
              value={editForm.jobType}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              rows={5}
            />

            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                name="isActive"
                checked={editForm.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>

            <div className="flex justify-end gap-3 mt-6">
              {role === 'candidate' ? (
                <>
                  <button
                    onClick={() => {
                      alert('Application submitted successfully!');
                      closeEdit();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Apply for Job
                  </button>
                  <button
                    onClick={closeEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closeEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
