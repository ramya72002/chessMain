"use client";
import React, { useEffect, useState } from 'react';
import './learning.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import { UserDetails } from '../types/types';

// Define the course paths
const coursePaths: { [key: string]: string } = {
  'Basic Checkmates - 2': '/basic-checkmates-2/modules/m1',
  'Basics of Chess': '/modules/m1',
  'Good Bishop Bad Bishop': '/good-bishop-bad-bishop/modules/m1',
  'Basic Checkmates': '/basic-checkmates/modules/m1'
};

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<{ title: string; completed_percentage: number; transitionId?: string }[]>([]);
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [transitionIds, setTransitionIds] = useState<{ [key: string]: string }>({});
  const [isPaymentCompleted, setIsPaymentCompleted] = useState<{ [key: string]: boolean }>({});
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Fetch user details from localStorage
    const userDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
    // Fetch registered courses from the API
    const fetchRegisteredCourses = async () => {
      try {
        const response = await axios.get(`https://backend-chess-tau.vercel.app/get-registered-courses?email=${storedUserDetails.email}`);
        if (response.status === 200) {
          const registeredCoursesData = response.data.registered_courses;
          setRegisteredCourses(registeredCoursesData);

          // Set available courses
          const allCourses = Object.keys(coursePaths);
          const registeredCourseTitles = registeredCoursesData.map((course: { title: string }) => course.title);
          const filteredCourses = allCourses.filter(course => !registeredCourseTitles.includes(course));
          setAvailableCourses(filteredCourses);

          // Initialize transition IDs and payment statuses
          const initialTransitionIds: { [key: string]: string } = {};
          const initialPaymentStatuses: { [key: string]: boolean } = {};
          registeredCoursesData.forEach((course: { title: string }) => {
            initialTransitionIds[course.title] = '';
            initialPaymentStatuses[course.title] = false;
          });
          setTransitionIds(initialTransitionIds);
          setIsPaymentCompleted(initialPaymentStatuses);
        }
      } catch (error) {
        console.error('Error fetching registered courses:', error);
      }
    };

    fetchRegisteredCourses();
  }, []);

  const handleRegister = async (courseTitle: string) => {
    if (!userDetails || !userDetails.email) return;
  
    try {
      // Register for the course
      const registerResponse = await axios.post('https://backend-chess-tau.vercel.app/add-course', {
        email: userDetails.email,
        title: courseTitle,
      });
  
      if (registerResponse.status === 200) {
        const newCourse = { title: courseTitle, completed_percentage: 0 }; // Default completion percentage
        setRegisteredCourses((prevCourses) => [...prevCourses, newCourse]);
        setAvailableCourses((prevCourses) => prevCourses.filter(course => course !== courseTitle));
  
        // Send registration confirmation email
        const emailResponse = await axios.post('https://backend-chess-tau.vercel.app/send_course_reg_email', {
          email: userDetails.email,
          title: courseTitle,
        });
  
        if (emailResponse.status === 200) {
          console.log('Confirmation email sent successfully');
        } else {
          console.error('Error sending confirmation email:', emailResponse.data);
        }
      }
    } catch (error) {
      console.error('Error registering for course or sending email:', error);
    }
  };

  const handleViewProgress = (courseTitle: string) => {
    // Redirect to the course's progress page using the path from coursePaths
    const path = coursePaths[courseTitle];
    if (path) {
      router.push(path);
    } else {
      console.error('Path not found for course:', courseTitle);
    }
  };

  const isRegistered = (courseTitle: string) => registeredCourses.some(course => course.title === courseTitle);

  const handleTransitionIdChange = (courseTitle: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setTransitionIds({
      ...transitionIds,
      [courseTitle]: event.target.value
    });
  };

  const handlePaymentSubmit = async (courseTitle: string) => {
    const transitionId = transitionIds[courseTitle];
    if (transitionId) {
      try {
        // Simulate payment verification
        // const paymentResponse = await axios.post('https://backend-chess-tau.vercel.app/verify-payment', {
        //   transitionId: transitionId,
        //   email: userDetails?.email
        // });
        const paymentResponse={status:200,data:"done"}
        paymentResponse.status=200
  
        if (paymentResponse.status === 200) {
          setIsPaymentCompleted({
            ...isPaymentCompleted,
            [courseTitle]: true
          });
          console.log('Payment verified successfully');
        } else {
          console.error('Error verifying payment:', paymentResponse.data);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      }
    }
  };

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>My Learning</h1>
      </header>

      <section className="courses-section">
        <div className="courses-header">
          <h3>Registered Courses</h3>
        </div>

        {registeredCourses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-status">
              <h4>{course.title}</h4>
              {isPaymentCompleted[course.title] ? (
                <button
                  className="progress"
                  style={{ backgroundColor: 'red' }}
                  onClick={() => handleViewProgress(course.title)}
                >
                  In Progress
                </button>
              ) : (
                <div className="payment-prompt">
                  <p>Please check your email and complete the payment.</p>
                  <input
                    type="text"
                    value={transitionIds[course.title] || ''}
                    onChange={(e) => handleTransitionIdChange(course.title, e)}
                    placeholder="Enter Transition ID"
                  />
                  <button
                    onClick={() => handlePaymentSubmit(course.title)}
                    disabled={!transitionIds[course.title]}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="progress-bar">
              <div className="progress-completed" style={{ width: `${course.completed_percentage}%` }}></div>
            </div>
            <p className="completed-steps">{course.completed_percentage}% COMPLETE</p>
          </div>
        ))}

        <div className="courses-header">
          <h3>Available Courses</h3>
        </div>

        {availableCourses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-status">
              <h4>{course}</h4>
              <button
                className={`progress ${isRegistered(course) ? 'registered' : ''}`}
                style={{ backgroundColor: isRegistered(course) ? 'gray' : 'blue' }}
                onClick={() => handleRegister(course)}
                disabled={isRegistered(course)}
              >
                {isRegistered(course) ? 'Registered' : 'Register'}
              </button>
            </div>
            <div className="progress-bar">
              <div className="progress-completed" style={{ width: isRegistered(course) ? '100%' : '0%' }}></div>
            </div>
            <p className="completed-steps">{isRegistered(course) ? '100%' : '0%'} COMPLETE</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyAccount;
