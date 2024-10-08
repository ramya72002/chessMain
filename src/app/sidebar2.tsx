import React, { useState } from "react";
import "./side2.scss";
import { useRouter } from "next/navigation";

const topics = [
  {
    title: "1. Chess Openings",
    completed: true,
    submodules: [
      { title: "1.1 Opening Principles", completed: true },
      { title: "1.2 White Opening", completed: true },
      { title: "1.3 Black Opening", completed: true }
    ]
  },
  {
    title: "2. Tactics [1]",
    completed: true,
    submodules: [
      { title: "2.1 Pins", completed: true },
      { title: "2.2 Forks", completed: true },
      { title: "2.3 Skewers", completed: true },
      { title: "2.4 Double Attack", completed: true },
      { title: "2.5 Remove of Defender", completed: true },
      { title: "2.6 DEflection", completed: true }
    ]
  },
  {
    title: "3. Tactics [2]",
    completed: true,
    submodules: [
      { title: "3.1 Decoy", completed: true },
      { title: "3.2 Overloading", completed: true },
      { title: "3.3 X-Ray attack", completed: true },
      { title: "3.4 Zwischenzug (Intermezzo):", completed: true },
      { title: "3.5 Desperado", completed: true },
      { title: "3.6 Interference", completed: true },
      { title: "3.7 Back Rank Tactics", completed: true }
    ]
  },
  {
    title: "4. Positional Calculations",
    completed: true,
    submodules: [
      { title: "4.1 Middlegame: Art of Calculation", completed: true },
      { title: "4.2 Pawn Structures", completed: true },
      { title: "4.3 Piece Activity", completed: true },
      { title: "4.4 Manoeuvring", completed: true }
    ]
  },
  {
    title: "5. Strategy & Planning",
    completed: true,
    submodules: [
      { title: "5.1 Pawn breaks", completed: true },
      { title: "5.2 Weak squares", completed: true },
      { title: "5.3 Piece coordination", completed: true }
    ]
  },
  {
    title: "6. Checks & Checkmates",
    completed: true,
    submodules: [
      { title: "6.1 Mate in 1", completed: true },
      { title: "6.2 Mate in 2", completed: true }
    ]
  },
  {
    title: "7. Chackmate Patterns",
    completed: true,
    submodules: [
      { title: "7.1 Anastasia’s Mate", completed: true },
      { title: "7.2 Back Rank Mate", completed: true },
      { title: "7.3 Blackburne’s Mate", completed: true },
      { title: "7.4 Box Mate (Rook Mate)", completed: true },
      { title: "7.5 Fool's Mate", completed: true },
      { title: "7.6 Morphy's Mate", completed: true },
      { title: "7.7 Scholar's Mate", completed: true },
      { title: "7.8 Smothered Mate", completed: true }
    ]
  },
  {
    title: "8. Game Analysis",
    completed: true,
    submodules: [
      { title: "8.1 Game Analysis", completed: true }
    ]
  },
  {
    title: "9. Chess Study Plan",
    completed: true,
    submodules: [
      { title: "9.1 Chess Study Plan", completed: true }
    ]
  }
  // Other modules...
];

const Sidebar2: React.FC = () => {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => setIsSidebarMinimized(!isSidebarMinimized);

  const handleGoBack = () => router.push('/learning');

  const handleSubmoduleClick = (title: string) => {
    if (title === "a.Opening Principles") {
      router.push("/modules/m1");
    } else if (title === "b.White Opening") {
      router.push("/modules/m2");
    } else if (title === "c.Black Opening") {
      router.push("/modules/m3");
    } else {
      const formattedSubmodule = title.toLowerCase().replace(/\s+/g, '-');
      router.push(`/level1Modules/${formattedSubmodule}`);
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
              <span className="topics-count">{topics.length} Topics</span> 
             </span>
          </div>
          <div className="topics">
            {topics.map((topic, index) => (
              <div
                className={`topic ${topic.completed ? "completed" : ""}`}
                key={index}
              >
                <div>
                  <span className="title">{topic.title}</span>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar2;
