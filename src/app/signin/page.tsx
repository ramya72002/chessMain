'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './Signin.scss'; // Import the SCSS file
import Loading from '../Loading';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const signIn = async (emailToSignIn: string) => {
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

        router.push('/portalhome');
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during SignIn:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      signIn(storedEmail);
    }
  }, []);

  const handleManualSignIn = () => {
    signIn(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {loading ? (
        <Loading /> // Use the Loading component here
      ) : (
        <div className={`bg-white p-8 rounded shadow-md w-full max-w-md email-box ${showPopup ? 'slide-from-left' : ''}`} style={{ borderRadius: '10px' }}>
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
          </div>
          <button
            className="signup-field bg-blue-500 text-white font-bold py-2 px-4 rounded w-full signin-box"
            onClick={handleManualSignIn}
            style={{ borderRadius: '10px' }}
          >
            Sign In
          </button>
        </div>
      )}

      {showPopup && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 signin-box slide-from-right`}>
          <div className="bg-white p-6 rounded shadow-md" style={{ borderRadius: '10px' }}>
            <h2 className="text-xl font-bold mb-4 text-black">Email is not registered.</h2>
            <p className="mb-4 text-black">Please register and try again</p>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => router.push('/signup')}
              style={{ borderRadius: '10px' }}
            >
              Register
            </button>
            <button
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setShowPopup(false)}
              style={{ borderRadius: '10px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
