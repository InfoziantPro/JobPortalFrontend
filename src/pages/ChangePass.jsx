import React, { useState } from 'react';
import apiClient from '../api/apiClient'; // your axios instance or similar

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post('/reset-password', {
        oldPassword,
        newPassword,
      });

      setSuccess(response.data.message || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Failed to change password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit}>

        <label className="block mb-2 font-medium">
          Old Password
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
            autoComplete="current-password"
          />
        </label>

        <label className="block mb-2 font-medium">
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full mt-1 p-2 border rounded"
            autoComplete="new-password"
          />
        </label>

        <label className="block mb-4 font-medium">
          Confirm New Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full mt-1 p-2 border rounded"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
