import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const yearsOfExpOptions = [
  '0-1', '1-2', '2-3', '3-4', '4-5', '5+',
];

const categoriesOptions = [
  'Banking',
  'Digital & Creative',
  'Retail',
  'Human Resources',
  'Management',
];

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profileImageURL: '',
    fullName: '',
    email: '',
    profileDescription: '',
    phone: '',
    age: 18,
    country: '',
    city: '',
    fullAddress: '',
    jobTitle: '',
    currentSalary: '0-1K',
    expectedSalary: '0-1K',
    education: '',
    yearsOfExp: '0-1',
    languages: [],
    categories: [],
    allowProfileListing: true,
    socials: {
      linkedin: '',
      facebook: '',
      twitter: '',
      googleplus: '',
    },
    website: '',
  });

  const [categoriesInput, setCategoriesInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/get-profile');
        const { user, profile } = res.data;

        setFormData((prev) => ({
          ...prev,
          profileImageURL: profile.profileImageURL || '',
          fullName: profile.name || user.fullName || '',
          email: user.email || '',
          profileDescription: profile.profileDescription || '',
          phone: profile.phone || '',
          age: profile.age || 18,
          country: profile.country || '',
          city: profile.city || '',
          fullAddress: profile.fullAddress || '',
          jobTitle: profile.jobTitle || '',
          currentSalary: profile.currentSalary || '0-1K',
          expectedSalary: profile.expectedSalary || '0-1K',
          education: profile.education || '',
          yearsOfExp: profile.yearsOfExp || '0-1',
          languages: profile.languages || [],
          categories: profile.categories || [],
          allowProfileListing: profile.allowProfileListing ?? true,
          socials: {
            linkedin: profile.socials?.linkedin || '',
            facebook: profile.socials?.facebook || '',
            twitter: profile.socials?.twitter || '',
            googleplus: profile.socials?.googleplus || '',
          },
          website: profile.website || '',
        }));

        setCategoriesInput((profile.categories || []).join(', '));
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setError('Failed to load profile data.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.socials) {
      setFormData((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [name]: value,
        },
      }));
    } else if (name === 'allowProfileListing') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === 'languages') {
      setFormData((prev) => ({
        ...prev,
        languages: value.split(',').map(lang => lang.trim()),
      }));
    } else if (name === 'categories') {
      setCategoriesInput(value);
    } else if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const rawCategories = categoriesInput.split(',').map(cat => cat.trim());
    const validCategories = rawCategories.filter(cat =>
      categoriesOptions.includes(cat)
    );

    if (rawCategories.length !== validCategories.length) {
      setError(
        `Invalid categories found. Allowed: ${categoriesOptions.join(', ')}`
      );
      setLoading(false);
      return;
    }

    const payload = {
      profileImageURL: formData.profileImageURL,
      name: formData.fullName,
      phone: formData.phone,
      profileDescription: formData.profileDescription,
      age: formData.age,
      country: formData.country,
      city: formData.city,
      fullAddress: formData.fullAddress,
      jobTitle: formData.jobTitle,
      currentSalary: formData.currentSalary,
      expectedSalary: formData.expectedSalary,
      education: formData.education,
      yearsOfExp: formData.yearsOfExp,
      languages: formData.languages,
      categories: validCategories,
      allowProfileListing: formData.allowProfileListing,
      socials: formData.socials,
      website: formData.website,
    };

    try {
      const res = await apiClient.put('/edit-profile', payload);
      setSuccess(res.data.message || 'Profile updated successfully!');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded shadow-md bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Image URL */}
        <label className="flex flex-col">
          Profile Image URL
          <input
            type="url"
            name="profileImageURL"
            value={formData.profileImageURL}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {/* Full Name */}
        <label className="flex flex-col">
          Full Name *
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>

        {/* Email */}
        <label className="flex flex-col">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          Phone
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Profile Description */}
        <label className="flex flex-col md:col-span-2">
          Profile Description
          <textarea
            name="profileDescription"
            value={formData.profileDescription}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            rows={4}
          />
        </label>

        {/* Age */}
        <label className="flex flex-col">
          Age
          <input
            type="number"
            name="age"
            min="18"
            max="65"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Country */}
        <label className="flex flex-col">
          Country
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* City */}
        <label className="flex flex-col">
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Full Address */}
        <label className="flex flex-col md:col-span-2">
          Full Address
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Job Title */}
        <label className="flex flex-col">
          Job Title
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Salaries */}
        <label className="flex flex-col">
          Current Salary
          <input
            type="text"
            name="currentSalary"
            value={formData.currentSalary}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Expected Salary
          <input
            type="text"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Education */}
        <label className="flex flex-col md:col-span-2">
          Education
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Experience */}
        <label className="flex flex-col">
          Years of Experience
          <select
            name="yearsOfExp"
            value={formData.yearsOfExp}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          >
            {yearsOfExpOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        {/* Languages */}
        <label className="flex flex-col">
          Languages (comma separated)
          <input
            type="text"
            name="languages"
            value={formData.languages.join(', ')}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
          />
        </label>

        {/* Categories */}
        <label className="flex flex-col">
          Categories (comma separated)
          <input
            type="text"
            name="categories"
            value={categoriesInput}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            placeholder="e.g. Banking, Retail"
          />
          <small className="text-gray-500 mt-1">
            Allowed: {categoriesOptions.join(', ')}
          </small>
        </label>

        {/* Profile Listing */}
        <label className="flex items-center space-x-3 mt-4 md:col-span-2">
          <input
            type="checkbox"
            name="allowProfileListing"
            checked={formData.allowProfileListing}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Allow Profile Listing</span>
        </label>

        {/* Website */}
        <label className="flex flex-col md:col-span-2">
          Website
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            placeholder="https://yourwebsite.com"
          />
        </label>

        {/* Socials */}
        <fieldset className="md:col-span-2 border p-4 rounded">
          <legend className="text-lg font-medium mb-3">Social Media</legend>
          {['linkedin', 'facebook', 'twitter', 'googleplus'].map((social) => (
            <label key={social} className="block mb-3 capitalize">
              {social}
              <input
                type="url"
                name={social}
                value={formData.socials[social] || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder={`https://${social}.com/your-profile`}
              />
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
