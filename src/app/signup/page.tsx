'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './Signup.scss'; // Import the SCSS file for signup styles
import Loading from '../Loading';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('level1');
  const [loading, setLoading] = useState(false); // Add loading state
  const [emailError, setEmailError] = useState(''); // Add email error state
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true); // Start loading
    setEmailError(''); // Clear any existing error
    try {
      const response = await axios.post('https://backend-chess-tau.vercel.app/signup', { name, email, level: selectedLevel });
      console.log('Signup response:', response.data);
      if (response.data.success) {
        router.push('/signin');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Optional: Add error handling here
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

  return (
    <div className="signup-background">
      {loading ? (
        <Loading /> // Use the Loading component
      ) : (
        <div className="signup-form-container">
          <div className="signup-form">
            <h2 className="text-3xl font-bold mb-4 text-black text-center">Create Your Account</h2>
            <div className="signup-container">
              <div className="signup-field mb-4">
                <label className="signup-label block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="signup-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: '10px', color: 'black' }}
                />
              </div>

              <div className="signup-field mb-4">
                <label className="signup-label block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="signup-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: '10px', color: 'black' }}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} {/* Display email error */}
              </div>

              <div className="signup-field mb-4">
                <label className="signup-label block text-gray-700 mb-2">Level</label>
                <select
                  className="signup-select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  style={{ borderRadius: '10px', color: 'black' }}
                >
                  <option value="level1">Level 1</option>
                  <option value="level2">Level 2</option>
                  <option value="level3">Level 3</option>
                  <option value="level4">Level 4</option>
                  <option value="level5">Level 5</option>
                  <option value="level6">Level 6</option>
                </select>
              </div>

              <button
                className="signup-button mt-4"
                onClick={handleSignup}
              >
                Create Account
              </button>
            </div>

            {/* Add sign-in link */}
            <div className="text-center mt-4">
              <p className="text-gray-700">Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
