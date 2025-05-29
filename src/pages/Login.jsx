import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import signUp from '../assets/SignUpPage.png';
import apiClient from '../api/apiClient'; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resendLinkVisible, setResendLinkVisible] = useState(false);
  const navigate = useNavigate();
  const [verificationLink, setVerificationLink] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/login', { email, password });
      const { token, user } = response.data;

      if (user.role === 'user' && !user.emailVerified) {
        toast.error('Please verify your email before logging in.');
        setResendLinkVisible(true);
        setVerificationLink(response.data.emailVerificationLink);
        return;
      }

      if (user.role === 'admin' && user.status !== 'approved') {
        toast.warn('Your account is pending approval by the Super Admin.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 403 && data?.emailVerificationLink) {
        setVerificationLink(data.emailVerificationLink);
        setResendLinkVisible(true);
      }

      toast.error(data?.error || 'Login failed');
    }
  };

  const handleResendVerification = async () => {
    try {
      await apiClient.post('/resend-verification', { email });
      toast.success('Verification email resent!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div className="hidden md:flex w-1/2  items-center justify-center ">
        <img
          src={signUp}
          alt="login visual"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right Form Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white px-4 md:px-16">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login to Infoziant</h2>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-violet-600" />
              Remember me
            </label>
            <a href="#" className="text-violet-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
          >
            Log In
          </button>

          {resendLinkVisible && (
            <div className="text-sm text-center text-gray-600 mt-2 space-y-2">
              <p className="text-red-500 font-medium">
                Your email is not verified. Please verify to proceed.
              </p>
              {verificationLink && (
                <p>
                  Click to verify:{' '}
                  <a
                    href={verificationLink}
                    className="text-blue-600 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify Email
                  </a>
                </p>
              )}
            </div>
          )}

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{' '}
            <a href="/signup" className="text-violet-600 font-medium hover:underline">Signup</a>
          </p>

          <div className="flex items-center justify-between my-4">
            <div className="h-px bg-gray-300 w-full" />
            <span className="text-gray-400 px-2 text-sm">or</span>
            <div className="h-px bg-gray-300 w-full" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              className="w-full border border-blue-600 text-blue-600 rounded-lg py-2 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50"
            >
              <i className="fab fa-facebook"></i>
              Log In via Facebook
            </button>

            <button
              type="button"
              className="w-full border border-red-500 text-red-600 rounded-lg py-2 font-semibold flex items-center justify-center gap-2 hover:bg-red-50"
            >
              <i className="fab fa-google"></i>
              Log In via Gmail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
