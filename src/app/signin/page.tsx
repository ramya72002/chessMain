/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './Signin.scss'; // Import the SCSS file
import Loading from '../Loading';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // State to show OTP input
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [emailError, setEmailError] = useState(''); // Add email error state
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (emailToSignIn: string) => {
    if (!validateEmail(emailToSignIn)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setLoading(true); // Start loading
    try {
      const loginResponse = await axios.post('https://backend-chess-tau.vercel.app/login', { email: emailToSignIn });
      console.log('SignIn response:', loginResponse.data);

      if (loginResponse.data.success) {
        localStorage.setItem('email', emailToSignIn);

        const userDetailsResponse = await axios.get('https://backend-chess-tau.vercel.app/getuserdetails', {
          params: { email: emailToSignIn }
        });
        console.log('UserDetails response:', userDetailsResponse.data);

        localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data.data));

        if (loginResponse.data.otp_required) {
          // If OTP is required, show the OTP input
          setShowOtpInput(true);
          localStorage.setItem('email', emailToSignIn); // Save email in local storage
        }
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during SignIn:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const verifyOtp = async () => {
    setLoading(true); // Start loading
    try {
      const verifyOtpResponse = await axios.post('https://backend-chess-tau.vercel.app/verify_otp', { email, otp });
      console.log('Verify OTP response:', verifyOtpResponse.data);

      if (verifyOtpResponse.data.success) {
        // Navigate to /portalhome on successful OTP verification
        router.push('/portalhome');
      } else {
        alert('Invalid OTP. Please check and try again.'); // User-friendly error message
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      router.push('/portalhome');
    }
  }, []);

  const handleManualSignIn = () => {
    signIn(email);
  };

  return (
    <div className="signup-background">
      {loading ? (
        <Loading /> // Use the Loading component here
      ) : (
        <div className="signup-form-container">
        
          <div className="signup-form">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">Sign In</h2>
            <div className="signup-field mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '10px', color: 'black' }}
              />
              {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            {showOtpInput && (
              <div className="signup-field mb-4">
                <label className="block text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ borderRadius: '10px', color: 'black' }}
                />
              </div>
            )}
            <button
            className="signup-field bg-blue-500 text-white font-bold py-2 px-4 rounded w-full signin-box"
              onClick={showOtpInput ? verifyOtp : handleManualSignIn}
            style={{ borderRadius: '10px' }}
            >
              {showOtpInput ? 'Verify OTP' : 'Sign In'}
            </button>
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <p className="text-center text-black text-lg mb-4">Email is not registered</p>
                  <button className="popup-button" onClick={() => router.push('/signup')}>Go to Signup</button>
                </div>
              </div>
            )}
            <div className="text-center mt-4">
              <p className="text-gray-700">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
