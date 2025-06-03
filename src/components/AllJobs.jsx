import { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../api/apiClient'; // Adjust the import path as necessary

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicJobs();
  }, []);

  const fetchPublicJobs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/jobs/public/all'); // Update this path if needed
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch public jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No active jobs available at the moment.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Job Listings</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="border p-5 rounded-lg shadow hover:shadow-md transition duration-200 bg-white"
          >
            <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
            <p className="text-gray-700 mt-1">
              {job.company} • {job.location}
            </p>
            <p className="mt-3 text-gray-600">
              {job.description?.slice(0, 120)}...
            </p>
            <p className="text-sm text-gray-500 mt-2">Type: {job.jobType}</p>
            {job.postedBy && (
              <p className="text-xs text-gray-400 mt-2">
                Posted by: {job.postedBy.name} ({job.postedBy.email})
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllJobs;
