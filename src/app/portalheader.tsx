"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faPuzzlePiece, faGamepad, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.clear(); // Clear all items from local storage
    router.push('/'); // Redirect to the home page
  };

  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="flex-1"></div>
      <nav className="flex space-x-8">
        <a href="/learning-path" className="text-blue-500 hover:text-blue-600 flex items-center text-lg font-bold p-2 bg-yellow-200 rounded-lg">
          <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
          Learning Path
        </a>
        <a href="/puzzles" className="text-green-500 hover:text-green-600 flex items-center text-lg font-bold p-2 bg-yellow-200 rounded-lg">
          <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />
          Puzzles
        </a>
        <a href="/profile" className="text-red-500 hover:text-red-600 flex items-center text-lg font-bold p-2 bg-yellow-200 rounded-lg">
          <FontAwesomeIcon icon={faGamepad} className="mr-2" />
          Games
        </a>
      </nav>
      <div className="flex-1 flex justify-end">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-400"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
