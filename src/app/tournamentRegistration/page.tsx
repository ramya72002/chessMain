'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './TournamentRegistration.scss';

const TournamentRegistration = () => {
    const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Default Tournament Name';
  const location = searchParams.get('location') || 'Default Location';

  const [formData, setFormData] = useState({
    uscfId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    schedule: '',
    section: '',
    byes: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="tournament-registration">
      <h2>{name} Tournament Registration</h2>
      <p>Location: {location}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="uscfId">USCF ID *</label>
          <input
            type="text"
            id="uscfId"
            name="uscfId"
            value={formData.uscfId}
            onChange={handleChange}
            placeholder="USCF ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number *</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="schedule">Select Tournament Schedule</label>
          <select
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
          >
            <option value="">Select Schedule</option>
            {/* Add schedule options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="section">Select Tournament Section</label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">Select Section</option>
            {/* Add section options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="byes">Select No Of Byes (Optional)</label>
          <select
            id="byes"
            name="byes"
            value={formData.byes}
            onChange={handleChange}
          >
            <option value="">Not selected</option>
            {/* Add bye options here */}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="proceed-button">PROCEED TO PAYMENT</button>
          <button type="button" className="cancel-button" onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TournamentRegistration;
