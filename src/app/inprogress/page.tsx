import React from 'react';
import './inprogress.scss';

interface LessonStep {
  title: string;
  completed: boolean;
  isQuiz?: boolean;
}

interface LessonContentProps {
  steps: LessonStep[];
  progress: number;
  completedSteps: number;
  totalSteps: number;
}

const inprogress: React.FC<LessonContentProps> = ({ steps, progress, completedSteps, totalSteps }) => {
  return (
    <div className="lesson-content">
      <div className="progress-bar">
        <span>{progress}% COMPLETE</span>
        <span>{completedSteps}/{totalSteps} Steps</span>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <h1>Blockchain Basic Concepts</h1>
      <p className="course-path">Certified Ethereum Developer Program &gt; Blockchain Basic Concepts</p>

      <div className="lesson-steps">
        <h2>Lesson Content <span className="completion-rate">{progress}% Complete | {completedSteps}/{totalSteps} Steps</span></h2>
              <ul>
                  {steps?.map((step, index) => (
                      <li key={index} className={step.completed ? 'completed' : ''}>
                          <span className="checkmark">&#10004;</span>
                          {step.isQuiz && <span className="quiz-icon">📄</span>}
                          {step.title}
                      </li>
                  )) || <li>No steps available</li>}
              </ul>

      </div>
    </div>
  );
};

export default inprogress;
