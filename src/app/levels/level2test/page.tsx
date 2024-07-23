'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Level2test.scss'; // Importing SCSS file for styling

const Level2Test = () => {
  const router = useRouter();
  const [score, setScore] = useState<number>(0); // State to track overall score
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({
    1: null, // Initial state for question 1
    2: null, // Initial state for question 2
  });
  const [showCongratulations, setShowCongratulations] = useState<boolean>(false); // State to manage congratulatory message
 
  
  const handleQuestionSubmit = (questionNumber: number, selectedOption: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionNumber]: selectedOption,
    });

    // Logic to calculate score (for demonstration, score increases by 20 for each correct answer)
    if (questionNumber === 1 && selectedOption === 2) { // Correct answer for question 1
      setScore(score + 20);
    } else if (questionNumber === 2 && selectedOption === 2) { // Correct answer for question 2
      setScore(score + 20);
    }

    // Normally, you would have logic to handle multiple questions and calculate score accordingly
  };

  const handleTestSubmit = () => {
    // Check if score is more than or equal to 40
    if (score == 40) {
      setShowCongratulations(true); // Show congratulatory message
    } else {
      alert('You did not pass the test. Please study more and try again.');
      // Optionally, you could provide retry options or return to Level 1
    }
  };

  const handleProceedToLevel2 = async () => {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;    const response = await fetch('https://backend-chess-tau.vercel.app/updatelevel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userDetails.name, level: 'level2' }),
        
      });
      

      const result = await response.json();
      
      if (result.success) {
        const userDetailsString = localStorage.getItem('userDetails');
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;;
        userDetails.level = 'level2';
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        console.log("l1",localStorage)
        // Navigate to portalhome
        router.push('/portalhome'); // Navigate to Level 2
        
      } else {
        alert(result.message);
      }

  };

  return (
    <div className="level2-test-container">
      <h1>Level 2 Test</h1>
      <p>Answer the following questions to proceed to Level 2:</p>

      {/* Question 1 */}
      <div className="question">
        <h3>Question 1: How does a knight move in chess?</h3>
        <ul>
          <li className={selectedOptions[1] === 1 ? 'selected' : ''} onClick={() => handleQuestionSubmit(1, 1)}>Option 1: Like a rook</li>
          <li className={selectedOptions[1] === 2 ? 'selected' : ''} onClick={() => handleQuestionSubmit(1, 2)}>Option 2: In an L shape</li> {/* Correct answer for demonstration */}
          <li className={selectedOptions[1] === 3 ? 'selected' : ''} onClick={() => handleQuestionSubmit(1, 3)}>Option 3: Diagonally</li>
          <li className={selectedOptions[1] === 4 ? 'selected' : ''} onClick={() => handleQuestionSubmit(1, 4)}>Option 4: Like a king</li>
        </ul>
      </div>

      {/* Question 2 */}
      <div className="question">
        <h3>Question 2: How many squares can a bishop move in one turn?</h3>
        <ul>
          <li className={selectedOptions[2] === 1 ? 'selected' : ''} onClick={() => handleQuestionSubmit(2, 1)}>Option 1: 2 squares</li>
          <li className={selectedOptions[2] === 2 ? 'selected' : ''} onClick={() => handleQuestionSubmit(2, 2)}>Option 2: As many as it wants diagonally</li> {/* Correct answer for demonstration */}
          <li className={selectedOptions[2] === 3 ? 'selected' : ''} onClick={() => handleQuestionSubmit(2, 3)}>Option 3: Only 1 square</li>
          <li className={selectedOptions[2] === 4 ? 'selected' : ''} onClick={() => handleQuestionSubmit(2, 4)}>Option 4: Cannot move diagonally</li>
        </ul>
      </div>

      {/* Submit Test button */}
      <div className="button-container">
        <button className="test-submit-button" onClick={handleTestSubmit}>
          Submit Test
        </button>

        {/* Congratulations message */}
        {showCongratulations && (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '60%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}>
                    Congratulations! You passed the test.
                </p>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#1fe426',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }} onClick={handleProceedToLevel2}>
                    Proceed to Level 2
                </button>
                </div>
                {/* Confetti or other celebratory effects can be added here */}
                <div style={{ fontSize: '48px', marginTop: '20px' }}>
                🎉🎉🎉
                </div>
            </div>
)}

      </div>
    </div>
  );
};

export default Level2Test;
