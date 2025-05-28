import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resendLinkVisible, setResendLinkVisible] = useState(false);
  const navigate = useNavigate();
  const [verificationLink, setVerificationLink] = useState(null);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    const { token, user } = response.data;

    // ✅ Email verification check (only for candidates)
    if (user.role === 'user' && !user.emailVerified) {
      toast.error('Please verify your email before logging in.');
      setResendLinkVisible(true);
      setVerificationLink(response.data.emailVerificationLink); // <--- GET THE LINK
      return;
    }

    // ✅ Approval status check (only for admin)
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
      await axios.post('http://localhost:5000/api/resend-verification', { email });
      toast.success('Verification email resent!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        {resendLinkVisible && (
          <div className="text-sm text-center text-gray-600 mt-4 space-y-2">
            <p className="text-red-500 font-medium">
              Your email is not verified. Please verify to proceed.
            </p>

            {verificationLink && (
              <p>
                Click to verify:{" "}
                <a
                  href={verificationLink}
                  className="text-blue-600 underline font-medium hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verify Email
                </a>
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );

};

export default Login;
