"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Learnclass.scss';
import { Session } from '../types/types';

const Learnclass = () => {
  const [sessions, setSessions] = useState<Session[]>([]);  const [loading, setLoading] = useState(true); // State for loading indicator
// Define the type inline
const [messages, setMessages] = useState<{ [key: string]: string }>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if localStorage is available and get user email
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('https://backend-chess-tau.vercel.app/sessions');
        setSessions(response.data[0].sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchSessions();
  }, []);

  const handleEnrollClick = async (session:Session) => {
    if (!userEmail) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [session._id]: 'User email is not available. Please log in again.'
      }));
      return;
    }

    try {
      const response = await axios.post('https://backend-chess-tau.vercel.app/send-email', {
        email: userEmail,
        session_link: session.session_link,
        date: session.date,
        time: session.time,
        coach_name: session.coach_name,
      });
      setMessages(prevMessages => ({
        ...prevMessages,
        [session._id]: response.data.message
      })); // Set the response message for the specific session
    } catch (error) {
      console.error('Error sending email:', error);
      setMessages(prevMessages => ({
        ...prevMessages,
        [session._id]: 'Failed to send email. Please try again.'
      })); // Set the error message for the specific session
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length > 0 ? (
        sessions.map((session) => (
          <div key={session._id} className="session-card">
            <div className="details">
              <p className="day"><strong>{session.date}</strong></p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Coach:</strong> {session.coach_name}</p>
              <p><strong>Location:</strong> <a href={session.session_link} target="_blank" rel="noopener noreferrer">Online</a></p>
            </div>
            <div className="actions">
              <button onClick={() => handleEnrollClick(session)} className="enroll-button">Enroll</button>
              {messages[session._id] && <p className="response-message">{messages[session._id]}</p>}
            </div>
          </div>
        ))
      ) : (
        <p>No sessions available.</p>
      )}
    </div>
  );
};

export default Learnclass;
