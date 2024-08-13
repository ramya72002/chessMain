"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHome,FaSignOutAlt, FaQuestionCircle, FaGraduationCap, FaChalkboardTeacher, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
import axios from 'axios';
import './side.scss';
import { UserDetails } from './types/types';


const Sidebar = () => {
  const router = useRouter();
  const handleViewProfile = () => {
    router.push('/portalhome');
  };
  const handleSignOut = () => {
   
    localStorage.clear(); // Clear all items from local storage
    router.push('/'); // Redirect to the home page
  };
  const [profilePic, setProfilePic] = useState('/images/portal/b4.png'); // Default profile picture
  const [showAvatarOptions, setShowAvatarOptions] = useState(false); // Toggle state for avatar options visibility
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // State to store user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails  = userDetailsString ? JSON.parse(userDetailsString) : null; 
        console.log(typeof window);
        if (storedUserDetails && storedUserDetails.image) {
          setProfilePic(storedUserDetails.image);
          setUserDetails(storedUserDetails);
        }

        // Prepare data to send to the backend
     
        const  email= storedUserDetails.email
       

        try {
          if(email){
           
          const response = await axios.get(`https://backend-chess-tau.vercel.app/getuserdetails?email=${email}`);
          setUserDetails(response.data.data); // Assuming response.data.data contains user details

          if (response.data.data) {
            setUserDetails(response.data.data);
            console.log('Profile picture updated successfully');
          } else {
            console.error('Failed to update profile picture:', response.data.message);
          }}
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const changeProfilePic = async (newPic: string) => {
    try {
      // Update profile picture locally first
      setProfilePic(newPic);
      setShowAvatarOptions(false); // Close avatar options after selection
  
      // Ensure code runs only on the client side
      if (typeof window !== 'undefined') {
        // Retrieve updated userDetails from localStorage
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        
        if (!storedUserDetails) {
          throw new Error('User details not found in localStorage');
        }
  
        // Prepare data to send to the backend
        const data = {
          name: storedUserDetails.name,
          image: newPic,
        };
  
        // Call API to update image in the database
        const response = await axios.post('https://backend-chess-tau.vercel.app/imageupdate', data);
        console.log('API Response:', response.data);
  
        if (response.data.success) {
          // Update localStorage with updated user details
          const updatedUserDetails = { ...storedUserDetails, image: newPic };
          localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
          setUserDetails(updatedUserDetails);
          console.log('Profile picture updated successfully');
        } else {
          console.error('Failed to update profile picture:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };
  
  // List of available avatar images for girls and boys
  const girlAvatars = [
    '/images/portal/g1.png',
    '/images/portal/g2.png',
    '/images/portal/g3.png',
    '/images/portal/g4.png',
    '/images/portal/g5.png',
    '/images/portal/g6.png',
    '/images/portal/g7.png',
    '/images/portal/g8.png',
    '/images/portal/g9.png',
    // Add more girl avatar images as needed
  ];

  const boyAvatars = [
    '/images/portal/b1.png',
    '/images/portal/b2.png',
    '/images/portal/b3.png',
    '/images/portal/b4.png',
    '/images/portal/b5.png',
    '/images/portal/b6.png',
    '/images/portal/b7.png',
    '/images/portal/b8.png',
    '/images/portal/b9.png',
    // Add more boy avatar images as needed
  ];

  return (
    <div className="sidebar">
      <div className="profile">
      <div className="avatarContainer" onClick={() => setShowAvatarOptions(!showAvatarOptions)}>
  <Image src={profilePic} alt="Profile Picture" width={200} height={200} className="avatar" />
  {showAvatarOptions && (
    <div className="avatarSelection">
      <button className="closeButton" onClick={() => setShowAvatarOptions(false)}>X</button>
      <p>Select Profile Picture:</p>
      <div className="avatarTabs">
        <div className="avatarTab">
          <h3>Girls</h3>
          <div className="avatarList">
            {girlAvatars.map((avatar, index) => (
              <div key={index} className="avatarOption" onClick={() => changeProfilePic(avatar)}>
                <Image src={avatar} alt={`Girl Avatar ${index}`} width={200} height={200} />
              </div>
            ))}
          </div>
        </div>
        <div className="avatarTab">
          <h3>Boys</h3>
          <div className="avatarList">
            {boyAvatars.map((avatar, index) => (
              <div key={index} className="avatarOption" onClick={() => changeProfilePic(avatar)}>
                <Image src={avatar} alt={`Boy Avatar ${index}`} width={60} height={60} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}
</div>
        <div className="name">{userDetails ? userDetails.name : 'Student'}</div>
        <div className="role">Student</div>
        <button onClick={handleViewProfile} className="viewProfile">
      Home
    </button>      </div>
      <nav className="nav">
        <a href="/learning" className="navItem tests">
          <FaQuestionCircle /> Learning
        </a>
        <a href="/learnclass" className="navItem classes">
          <FaGraduationCap /> Learning Classes
        </a>
        <a href="/arena/puzzleArena" className="navItem teachers">
          <FaChalkboardTeacher /> Puzzle Arena
        </a>
        <a href="/tournaments" className="navItem events">
          <FaCalendarAlt /> Tournaments
        </a>
        <a onClick={handleSignOut} className="navItem logout">
          <FaSignOutAlt /> Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
