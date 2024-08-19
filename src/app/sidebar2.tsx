import React, { useState } from "react";
import "./side2.scss";
import { useRouter } from "next/navigation";

const topics = [
  {
    title: "Module1",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Submodule1.1", completed: true },
      { title: "Submodule1.2", completed: true },
      { title: "Submodule1.3", completed: true }
    ]
  },
  {
    title: "Module2",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Submodule2.1", completed: true },
      { title: "Submodule2.2", completed: true },
      { title: "Submodule2.3", completed: true }
    ]
  }
  // Other modules...
];

const Sidebar2: React.FC = () => {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarMinimized(!isSidebarMinimized);

  const handleGoBack = () => router.push('/learning');

  const handleTopicClick = (title: string) => {
    setActiveModule(prev => (title === prev ? null : title));
  };

  const handleSubmoduleClick = (title: string) => {
    router.push(`/level1Modules/${activeModule?.toLowerCase()}/${title.toLowerCase()}`);
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
              <span className="topics-count">{topics.length} Topics</span> | 
              <span className="quizzes-count">0 Quizzes</span>
            </span>
          </div>
          <div className="topics">
            {topics.map((topic, index) => (
              <div
                className={`topic ${topic.completed ? "completed" : ""}`}
                key={index}
              >
                <div onClick={() => handleTopicClick(topic.title)}>
                  <span className={`icon ${topic.completed ? "check" : ""}`}></span>
                  <span className="title">{topic.title}</span>
                </div>
                {activeModule === topic.title && (
                  <div className="submodules">
                    {topic.submodules.map((submodule, subIndex) => (
                      <div
                        className={`submodule ${submodule.completed ? "completed" : ""}`}
                        key={subIndex}
                        onClick={() => handleSubmoduleClick(submodule.title)}
                      >
                        <span className={`icon ${submodule.completed ? "check" : ""}`}></span>
                        <span className="title">{submodule.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar2;
