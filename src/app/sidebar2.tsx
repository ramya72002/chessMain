import React, { useState } from "react";
import "./side2.scss";
import { useRouter } from "next/navigation";

const topics = [
  { title: "Module1", isQuiz: false, completed: true },
  { title: "Module2", isQuiz: true, completed: true },
  { title: "Module3", isQuiz: false, completed: true },
  { title: "Module4", isQuiz: true, completed: true },
  { title: "Module5", isQuiz: false, completed: true },
]

const Sidebar2: React.FC = () => {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  const handleGoBack = () => {
    router.push('/learning'); // Go back to the previous page
  };

  const handleTopicClick = (title: string) => {
    // Navigate to the module's route
    router.push(`/level1Modules/${title.toLowerCase()}`);
  };

  return (
    <div className={`course-content ${isSidebarMinimized ? "minimized" : ""}`}>
      <div className="header">
        {!isSidebarMinimized && (
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        )}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarMinimized ? ">" : "<"}
        </button>
      </div>
      {!isSidebarMinimized && (
        <div className="module">
          <div className="module-header">
            <span>Basics Of Chess</span>
            <span className="progress">
              <span className="topics-count">5 Topics</span> | 
              <span className="quizzes-count">0 Quizzes</span>
            </span>
          </div>
          <div className="topics">
            {topics.map((topic, index) => (
              <div
                className={`topic ${topic.completed ? "completed" : ""}`}
                key={index}
                onClick={() => handleTopicClick(topic.title)}
              >
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
