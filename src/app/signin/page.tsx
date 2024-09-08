/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './Signin.scss'; // Import the SCSS file
import Loading from '../Loading';

// Function to determine device type
const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;

  // Check for mobile devices
  if (/android/i.test(userAgent) ||
      /iPhone|iPod/.test(userAgent) ||
      /Windows Phone/i.test(userAgent)) {
    return 'Mobile';
  }

  // Check for tablets
  if (/iPad/i.test(userAgent)) {
    return 'Tablet';
  }

  // Default to desktop
  return 'Desktop';
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // State to show OTP input
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message
  const [loading, setLoading] = useState(false); // Add loading state
  const [emailError, setEmailError] = useState(''); // Add email error state
  const router = useRouter();
  const signInButtonRef = useRef<HTMLButtonElement>(null); // Ref for the sign-in button

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (emailToSignIn: string, skipValidation = false) => {
    if (!skipValidation && !validateEmail(emailToSignIn)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setLoading(true); // Start loading
    try {
      const deviceType = getDeviceType(); // Get device type

      const loginResponse = await axios.post('https://backend-dev-chess.vercel.app/login', {
        email: emailToSignIn,
        device_name: deviceType // Send device type to the backend
      });

      if (loginResponse.data.success) {
        if (loginResponse.data.device) {
          // Show the Log Out from Other Device button instead of error message
          setPopupMessage(`You are already logged in on ${loginResponse.data.device_name}. Please log out to continue.`);
          setShowPopup(true);
          return; // Stop further processing
        }
        setShowPopup(false);

        localStorage.setItem('email', emailToSignIn);

        const userDetailsResponse = await axios.get('https://backend-dev-chess.vercel.app/getuserdetails', {
          params: { email: emailToSignIn }
        });

        localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data.data));

        if (loginResponse.data.otp_required) {
          setShowOtpInput(true);
          localStorage.setItem('email', emailToSignIn);
          localStorage.setItem('signin', "true");
        }
      } else {
        // If the email is not registered, show a different message or action
        setPopupMessage('Email is not registered');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during SignIn:', error);

      // Show the Log Out from Other Device button on error
      setPopupMessage('An error occurred during sign-in. Please log out from the other device to continue.');
      setShowPopup(true);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Function to handle logout from the previous device
  const handleLogoutFromPreviousDevice = async () => {
    if (email) {
      try {
        // Make API call to delete the session
        const response = await axios.post('https://backend-dev-chess.vercel.app/delete_session', { email });

        if (response.data.success) {
          // Automatically click the sign-in button
          if (signInButtonRef.current) {
            signInButtonRef.current.click();
          }
        } else {
          setPopupMessage('An error occurred while logging out. Please try again.');
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error logging out from previous device:', error);
        setPopupMessage('An error occurred while logging out. Please try again.');
        setShowPopup(true);
      }
    }
  };

  const verifyOtp = async () => {
    setLoading(true); // Start loading
    try {
      const verifyOtpResponse = await axios.post('https://backend-dev-chess.vercel.app/verify_otp', { email, otp });
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
    const signinStatus = localStorage.getItem('signin');
    if (storedEmail) {
      setEmailError('');
      setEmail(storedEmail); // Automatically fill the email input
      setShowOtpInput(true);
      if (signInButtonRef.current) {
        signIn(storedEmail, true); // Call signIn with skipValidation set to true
      }
    }
    if (storedEmail && signinStatus) {
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
              ref={signInButtonRef} 
            >
              {showOtpInput ? 'Verify OTP' : 'Sign In'}
            </button>
            {showPopup && (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={handleLogoutFromPreviousDevice}
                  >
                    Log Out from Other Device
                  </button>
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
