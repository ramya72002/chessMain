import React, { useState } from "react";
import "./side2.scss";
import { useRouter } from "next/navigation";

const topics = [
  {
    title: "Basics Of Chess",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Chessboard and Pieces Overview", completed: true },
      { title: "Basic Chess Rules", completed: true },
      { title: "Chess Notation Basics", completed: true }
    ]
  },
  {
    title: "Opening Principles",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Control of the Center", completed: true },
      { title: "Development of Pieces", completed: true },
      { title: "Common Opening Mistakes", completed: true }
    ]
  },
  {
    title: "Middle Game Strategies",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Pawn Structures", completed: true },
      { title: "Piece Coordination", completed: true },
      { title: "Planning and Strategy", completed: true }
    ]
  },
  {
    title: "Endgame Techniques",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Basic Checkmates", completed: true },
      { title: "King and Pawn Endgames", completed: true },
      { title: "Rook and Minor Piece Endgames", completed: true }
    ]
  },
  {
    title: "Advanced Tactics",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Forks and Pins", completed: true },
      { title: "Discovered Attacks", completed: true },
      { title: "Deflection and Decoy", completed: true }
    ]
  },
  {
    title: "Positional Play",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "Weak Squares and Weak Pawns", completed: true },
      { title: "Space and Piece Activity", completed: true },
      { title: "Positional Sacrifices", completed: true }
    ]
  },
  {
    title: "Chess Psychology and Mindset",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "The Importance of Focus and Concentration", completed: true },
      { title: "Handling Pressure in Competitive Play", completed: true },
      { title: "Understanding Your Opponent", completed: true }
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
    if (title === "Chessboard and Pieces Overview") {
      router.push("/modules/m1");
    } else if (title === "Basic Chess Rules") {
      router.push("/modules/m2");
    } else if (title === "Chess Notation Basics") {
      router.push("/modules/m3");
    } else {
      const formattedModule = activeModule?.toLowerCase().replace(/\s+/g, '-');
      const formattedSubmodule = title.toLowerCase().replace(/\s+/g, '-');
      router.push(`/level1Modules/${formattedModule}/${formattedSubmodule}`);
    }
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
