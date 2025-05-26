import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs/all', {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>
            <p className="text-sm text-gray-500">
              {job.company} • {job.location} • {job.jobType}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsList;
