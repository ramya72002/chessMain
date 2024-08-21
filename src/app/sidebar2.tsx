import React, { useState } from "react";
import "./side2.scss";
import { useRouter } from "next/navigation";

const topics = [
  {
    title: "1. Basics Of Chess",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "1.1 Chessboard and Pieces Overview", completed: true },
      { title: "1.2 Basic Chess Rules", completed: true },
      { title: "1.3 Chess Notation Basics", completed: true }
    ]
  },
  {
    title: "2. Opening Principles",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "2.1 Control of the Center", completed: true },
      { title: "2.2 Development of Pieces", completed: true },
      { title: "2.3 Common Opening Mistakes", completed: true }
    ]
  },
  {
    title: "3. Middle Game Strategies",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "3.1 Pawn Structures", completed: true },
      { title: "3.2 Piece Coordination", completed: true },
      { title: "3.3 Planning and Strategy", completed: true }
    ]
  },
  {
    title: "4. Endgame Techniques",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "4.1 Basic Checkmates", completed: true },
      { title: "4.2 King and Pawn Endgames", completed: true },
      { title: "4.3 Rook and Minor Piece Endgames", completed: true }
    ]
  },
  {
    title: "5. Advanced Tactics",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "5.1 Forks and Pins", completed: true },
      { title: "5.2 Discovered Attacks", completed: true },
      { title: "5.3 Deflection and Decoy", completed: true }
    ]
  },
  {
    title: "6. Positional Play",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "6.1 Weak Squares and Weak Pawns", completed: true },
      { title: "6.2 Space and Piece Activity", completed: true },
      { title: "6.3 Positional Sacrifices", completed: true }
    ]
  },
  {
    title: "7. Chess Psychology and Mindset",
    isQuiz: false,
    completed: true,
    submodules: [
      { title: "7.1 The Importance of Focus and Concentration", completed: true },
      { title: "7.2 Handling Pressure in Competitive Play", completed: true },
      { title: "7.3 Understanding Your Opponent", completed: true }
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
    if (title === "1.1 Chessboard and Pieces Overview") {
      router.push("/modules/m1");
    } else if (title === "1.2 Basic Chess Rules") {
      router.push("/modules/m2");
    } else if (title === "1.3 Chess Notation Basics") {
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
