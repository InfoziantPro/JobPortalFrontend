import { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/jobs/all', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
            <p className="mt-2">{job.description.substring(0, 100)}...</p>
            <p className="text-sm mt-1">Type: {job.jobType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
