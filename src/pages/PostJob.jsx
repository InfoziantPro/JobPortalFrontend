import { useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    location: 'Remote',
    salaryFrom: '',
    salaryTo: '',
    jobType: 'Full-time',
    emailAddress: '',
    username: '',
    specialisms: '',
    offeredSalary: '',
    careerLevel: '',
    experience: '',
    gender: '',
    industry: '',
    qualification: '',
    applicationDeadline: '',
    country: '',
    city: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return toast.error('You must be logged in to post a job');

    try {
      await apiClient.post(
        '/jobs/postjob',
        {
          title: form.title,
          description: form.description,
          company: form.company,
          location: form.location,
          salaryRange: {
            from: form.salaryFrom ? Number(form.salaryFrom) : undefined,
            to: form.salaryTo ? Number(form.salaryTo) : undefined,
          },
          jobType: form.jobType,
          emailAddress: form.emailAddress,
          username: form.username,
          specialisms: form.specialisms.split(',').map((s) => s.trim()),
          offeredSalary: form.offeredSalary,
          careerLevel: form.careerLevel,
          experience: form.experience,
          gender: form.gender,
          industry: form.industry,
          qualification: form.qualification,
          applicationDeadline: form.applicationDeadline,
          country: form.country,
          city: form.city,
          address: form.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Job posted successfully!');

      // Clear form
      setForm({
        title: '',
        description: '',
        company: '',
        location: 'Remote',
        salaryFrom: '',
        salaryTo: '',
        jobType: 'Full-time',
        emailAddress: '',
        username: '',
        specialisms: '',
        offeredSalary: '',
        careerLevel: '',
        experience: '',
        gender: '',
        industry: '',
        qualification: '',
        applicationDeadline: '',
        country: '',
        city: '',
        address: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to post job');
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-4xl font-bold text-gray-800 text-center">🚀 Post a New Job</h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Fill in the job details below to find the perfect candidate.
      </p>

      {/* Job Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Job Details</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" required className="input h-32 resize-none" />
        <input name="specialisms" value={form.specialisms} onChange={handleChange} placeholder="Specialisms (comma separated)" className="input" />
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Company Information</h3>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required className="input" />
        <input name="emailAddress" value={form.emailAddress} onChange={handleChange} placeholder="Email Address" className="input" />
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="input" />
      </div>

      {/* Salary & Career */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Salary & Experience</h3>
        <div className="flex gap-4">
          <input name="salaryFrom" type="number" value={form.salaryFrom} onChange={handleChange} placeholder="Salary From" className="input w-1/2" />
          <input name="salaryTo" type="number" value={form.salaryTo} onChange={handleChange} placeholder="Salary To" className="input w-1/2" />
        </div>
        <input name="offeredSalary" value={form.offeredSalary} onChange={handleChange} placeholder="Offered Salary (e.g., 50k-60k)" className="input" />
        <input name="careerLevel" value={form.careerLevel} onChange={handleChange} placeholder="Career Level" className="input" />
        <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience Required" className="input" />
      </div>

      {/* Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Requirements</h3>
        <select name="gender" value={form.gender} onChange={handleChange} className="input">
          <option value="">Gender Preference</option>
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" className="input" />
        <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" className="input" />
        <input name="applicationDeadline" type="date" value={form.applicationDeadline} onChange={handleChange} className="input" />
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Job Location</h3>
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="input" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Complete Address" className="input" />
        <select name="location" value={form.location} onChange={handleChange} className="input">
          <option value="">Select Work Type</option>
          <option value="Remote">Remote</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Job Type</h3>
        <select name="jobType" value={form.jobType} onChange={handleChange} className="input">
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition duration-300"
      >
        Post Job
      </button>
    </form>
  </div>
);

};

export default PostJob;
