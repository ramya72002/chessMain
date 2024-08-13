import React, { useState } from "react";
import "./side2.scss";

const topics = [
  { title: "Introduction to Blockchain", isQuiz: false, completed: true },
  { title: "Introduction to Blockchain-Quiz", isQuiz: true, completed: true },
  { title: "History of Blockchain", isQuiz: false, completed: true },
  { title: "History of Blockchain-Quiz", isQuiz: true, completed: true },
  { title: "Definition of Blockchain", isQuiz: false, completed: true },
  { title: "Definition of Blockchain-Quiz", isQuiz: true, completed: true },
  { title: "Attributes of Blockchain I", isQuiz: false, completed: true },
  { title: "Attributes of Blockchain II", isQuiz: false, completed: true },
  { title: "Attributes of Blockchain III", isQuiz: false, completed: true },
  { title: "Attributes of Blockchain IV", isQuiz: false, completed: true },
  { title: "Attributes of Blockchain-Quiz", isQuiz: true, completed: true },
  { title: "What is Cryptography and its various methods I", isQuiz: false, completed: true },
  { title: "What is Cryptography and its various methods II", isQuiz: false, completed: true },
  { title: "What is Cryptography and its various methods III", isQuiz: false, completed: true },
  { title: "What is Cryptography and its various methods-Quiz", isQuiz: true, completed: true },
];

const Sidebar2: React.FC = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className={`course-content ${isSidebarMinimized ? "minimized" : ""}`}>
      <div className="header">
        <h3>Certified Ethereum Developer Program</h3>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarMinimized ? ">" : "<"}
        </button>
      </div>
      {!isSidebarMinimized && (
        <div className="module">
          <div className="module-header">
            <span>Blockchain Basic Concepts</span>
            <span className="progress">
              <span className="topics-count">13 Topics</span> | 
              <span className="quizzes-count">8 Quizzes</span>
            </span>
          </div>
          <div className="topics">
            {topics.map((topic, index) => (
              <div className={`topic ${topic.completed ? "completed" : ""}`} key={index}>
                <span className={`icon ${topic.completed ? "check" : ""}`}></span>
                <span className="title">{topic.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar2;
