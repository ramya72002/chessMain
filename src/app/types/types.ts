// src/types/types.ts
export interface Session {
    _id: string;
    date: string;
    time: string;
    coach_name: string;
    session_link: string;
  }
  export interface RoundsTiming {
    start: string;
    arrivalTime: string;
    latePlayerNotice: string;
    under600End: string;
    under1200End: string;
  }
  
  export interface Section {
    name: string;
    registrationFee: string;
  }
  
  export interface Tournament {
    type: string;
    name: string;
    location: string;
    timeControl: string;
    upcomingDates: string[];
    roundsTiming: RoundsTiming;
    sections: Section[];
  }
  
  