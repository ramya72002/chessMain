"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin_tournaments.scss';
import { Tournament } from '../types/types';

const AdminTournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [activeTab, setActiveTab] = useState<string>('casual');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get<Tournament[]>('https://backend-chess-tau.vercel.app/tornaments');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  const renderTournaments = (type: string) => {
    return tournaments
      .filter(tournament => tournament.type === type)
      .map((tournament, index) => (
        <div key={index} className="tournamentCard">
          <h3><strong>Type</strong>{tournament.type}</h3>
          <h3><strong>Name:</strong>{tournament.name}</h3>
          <p><strong>Location:</strong> {tournament.location}</p>
          <p><strong>Time Control:</strong> {tournament.timeControl}</p>
          <p><strong>Upcoming Dates:</strong> {tournament.upcomingDates.join(', ')}</p>
          <div>
            <h4>Rounds Timing:</h4>
            <p><strong>Description</strong> {tournament.roundsTiming.description}</p>

          </div>
          <div>
            <h4>Sections:</h4>
            {tournament.sections.map((section, index) => (
              <p key={index}>
                <strong>{section.name}:</strong> {section.registrationFee}
              </p>
            ))}
          </div>
        </div>
      ));
  };

  return (
    <div className="container">
       <div className="tabs">
        <button
          className={activeTab === 'casual' ? 'activeTab' : ''}
          onClick={() => setActiveTab('casual')}
        >
          Casual
        </button>
        <button
          className={activeTab === 'usfc_related' ? 'activeTab' : ''}
          onClick={() => setActiveTab('usfc_related')}
        >
          USFC Related
        </button>
      </div>
      <div className="tournamentsList">
        {renderTournaments(activeTab)}
      </div>
    </div>
  );
};

export default AdminTournaments;
