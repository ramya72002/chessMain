"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Admin.scss'; // Import the optimized SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


interface FormData {
  date: Date | null;
  hour: string;
  minute: string;
  period: string;
  coach_name: string;
  session_link: string;
}

interface Session {
  _id: string;
  date: string;
  time: string;
  coach_name: string;
  session_link: string;
}

const Admin: React.FC = () => {
  const initialFormData: FormData = {
    date: null,
    hour: '12',
    minute: '00',
    period: 'AM',
    coach_name: '',
    session_link: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionAdded, setSessionAdded] = useState(false);


  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://backend-chess-tau.vercel.app/sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSessions();
  }, [sessionAdded]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      date
    });
  };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formattedData = formatFormData(formData);

    const response = await axios.post('https://backend-chess-tau.vercel.app/add-session', formattedData);
    console.log('Session added successfully:', response.data);

    // Reset form after successful submission
    setFormData(initialFormData);
    setSessionAdded(prev => !prev); // Toggle sessionAdded state to force re-render
  } catch (error) {
    console.error('Error adding session:', error);
    // Handle error appropriately
  } finally {
    setSubmitting(false);
  }
};
const handleDeleteSession = async (sessionId: string) => {
    try {
      // Find the session to delete based on sessionId
      const sessionToDelete = sessions.find(session => session._id === sessionId);
      if (!sessionToDelete) return;

      // Extract date and time from sessionToDelete
      const { date, time } = sessionToDelete;

      // Prepare data to send to the API
      const data = {
        date,
        time
      };

      // Send DELETE request to the API
      const response = await axios.delete('https://backend-chess-tau.vercel.app/del-session', { data });
      console.log('Session deleted successfully:', response.data);

      // Update sessions after successful deletion
      setSessions(prevSessions => prevSessions.filter(session => session._id !== sessionId));
    } catch (error) {
      console.error('Error deleting session:', error);
      // Handle error appropriately
    }
  };

  const validateForm = (data: FormData) => {
    let errors: Partial<FormData> = {};

    if (!data.session_link.trim()) {
      errors.session_link = 'Session Link is required';
    } else if (!isValidUrl(data.session_link)) {
      errors.session_link = 'Invalid Session Link';
    }

    return errors;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const formatFormData = (data: FormData) => {
    return {
      date: data.date ? formatDate(data.date) : '',
      time: `${data.hour}:${data.minute}${data.period}`,
      coach_name: data.coach_name,
      session_link: data.session_link
    };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); // Adjust locale if needed
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
      <div className="admin-container">
        <h2>Add Session</h2>
        <div className="admin-content">
          <div className="add-session">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date:</label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select Date"
                  className={`form-control ${formErrors.date && 'is-invalid'}`}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <div className="time-inputs">
                  <select
                    name="hour"
                    value={formData.hour}
                    onChange={handleChange}
                    className={`form-control ${formErrors.hour && 'is-invalid'}`}
                    required
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  :
                  <select
                    name="minute"
                    value={formData.minute}
                    onChange={handleChange}
                    className={`form-control ${formErrors.minute && 'is-invalid'}`}
                    required
                  >
                    <option value="00">00</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                  <select
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    className={`form-control ${formErrors.period && 'is-invalid'}`}
                    required
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                {formErrors.hour && <div className="invalid-feedback">{formErrors.hour}</div>}
                {formErrors.minute && <div className="invalid-feedback">{formErrors.minute}</div>}
                {formErrors.period && <div className="invalid-feedback">{formErrors.period}</div>}
              </div>
              <div className="form-group">
                <label>Coach Name:</label>
                <input
                  type="text"
                  name="coach_name"
                  value={formData.coach_name}
                  onChange={handleChange}
                  className={`form-control ${formErrors.coach_name && 'is-invalid'}`}
                  required
                />
                {formErrors.coach_name && <div className="invalid-feedback">{formErrors.coach_name}</div>}
              </div>
              <div className="form-group">
                <label>Session Link:</label>
                <input
                  type="text"
                  name="session_link"
                  value={formData.session_link}
                  onChange={handleChange}
                  className={`form-control ${formErrors.session_link && 'is-invalid'}`}
                  required
                />
                {formErrors.session_link && <div className="invalid-feedback">{formErrors.session_link}</div>}
              </div>
              <button type="submit" className={`button ${submitting && 'disabled'}`} disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Session'}
              </button>
            </form>
          </div>
          <div className="session-list">
            <h2>Sessions List</h2>
            {loading ? (
              <p>Loading sessions...</p>
            ) : (
              sessions.map(session => (
                <div key={session._id} className="session-box">
                  <div className="session-details">
                    <p>Date: {session.date}</p>
                    <p>Time: {session.time}</p>
                    <p>Coach: {session.coach_name}</p>
                  </div>
                  <div className="session-link">
                <a href={session.session_link} target="_blank" rel="noopener noreferrer">
                  Join Session
                </a></div>
                {/* Delete button for each session */}
                <button className="delete-button" onClick={() => handleDeleteSession(session._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>

              
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
   
  );
};

export default Admin;
