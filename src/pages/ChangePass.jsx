import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

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
      // Assuming `apiClient` and the API call are correctly set up
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
          <div className="relative">
            <input
              type={isOldPasswordVisible ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
              autoComplete="current-password"
            />
            <span
              onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {isOldPasswordVisible ? <FiEyeOff size={16} className="text-gray-600" /> : <FiEye size={16} className="text-gray-600" />}
            </span>
          </div>
        </label>

        <label className="block mb-2 font-medium">
          New Password
          <div className="relative">
            <input
              type={isNewPasswordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 p-2 border rounded"
              autoComplete="new-password"
            />
            <span
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {isNewPasswordVisible ? <FiEyeOff size={16}  className="text-gray-600"/> : <FiEye size={16} className="text-gray-600"/>}
            </span>
          </div>
        </label>

        <label className="block mb-4 font-medium">
          Confirm New Password
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 p-2 border rounded"
              autoComplete="new-password"
            />
            <span
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {isConfirmPasswordVisible ? <FiEyeOff size={16} className="text-gray-600" /> : <FiEye size={16} className="text-gray-600" />}
            </span>
          </div>
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
