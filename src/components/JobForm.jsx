// src/components/JobForm.js
import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function JobForm() {
  const { user } = useAuth();
  const role = user?.role;

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salaryRange: '',
    jobType: '',
  });

  const [message, setMessage] = useState(null);

  if (role !== 'admin') {
    return (
      <div className="text-red-600 p-4">
        ❌ Access denied. Only <strong>admins</strong> can post jobs.
      </div>
    );
  }

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await apiClient.post('/jobs/postjob', jobData);
      setMessage('✅ Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        company: '',
        location: '',
        salaryRange: '',
        jobType: '',
      });
    } catch (error) {
      setMessage('❌ Failed to post job. You might not be authorized.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
      {message && (
        <div className="mb-4 text-sm text-blue-700">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        {['title', 'description', 'company', 'location', 'salaryRange', 'jobType'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={jobData[field]}
            onChange={handleChange}
            required={['title', 'description', 'company'].includes(field)}
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
