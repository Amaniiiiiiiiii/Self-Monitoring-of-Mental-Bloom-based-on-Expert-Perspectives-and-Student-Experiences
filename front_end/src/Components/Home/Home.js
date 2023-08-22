import React, { useState, useEffect, useContext } from "react"; // importing model to suport client and server implementation
import "./Home.css";
import doctorImage from "../../Resources/doctor.png";
import { FaUser, FaBrain } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext";

import image1 from "../../Resources/image1.jpeg";
import image2 from "../../Resources/image2.jpeg";
import image3 from "../../Resources/image3.jpeg";
import image4 from "../../Resources/image4.jpeg";

function Home() { // to calculate outputs and fuction takes input from home and redirects to get started
  const [responseData, setResponseData] = useState({ // useState to add state to functional compunds
    usersCount: 0,
    modelUsedCount: 0,
    accuracy: 0,
  });
  const navigate = useNavigate(); //for navigation reacts the navigation prop of the screen its inside give access to navigation object
  const context = useContext(MyContext); //to access mycontext.js file

  useEffect(() => { //allows to perform fetching updating
    fetch(`http://localhost:8000/get_stats/`, { // to fetch 
      method: "GET",
      headers: { "Content-Type": "application/json" }, // used to include the type of media of the http message usually utf-8 encoding
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) { // if successfuly fetches home page stats values are returned else gives console error
          setResponseData({
            usersCount: data.stats.usersCount,
            modelUsedCount: data.stats.modelUsedCount,
            accuracy: data.stats.accuracy,
          });
        }
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  const handleClick = () => { //instance method to navigate local state 
    if (context.user) navigate("/form"); //validates entry of form and then navigates to authentication
    else navigate("/authentication");
  };

  return (
    <div className="container"> 
      <svg
        viewBox="0 0 323.9 265.47"
        style={{ zIndex: "1", position: "absolute", bottom: 0, right: 0 }}
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="284.83"
            y1="369.56"
            x2="481.5"
            y2="172.22"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#b700ff" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="356.33"
            y1="234.41"
            x2="337"
            y2="361.08"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3f14a3" stopOpacity="0" />
            <stop offset="1" stopColor="#b700ff" />
          </linearGradient>
        </defs>
        <g id="OBJECTS">
          <g>
            <path
              className="cls-1"
              d="M147.6,378.33H471.5V112.86c-30,3.86-47.92,27.77-53.72,40.67-9,20-24,32.75-50.75,29.5s-42.75,4.5-59.25,39.25c-14.55,30.62-30.25,23.25-91.75,38s-44.5,55.5-57.25,97.39A58.23,58.23,0,0,1,147.6,378.33Z"
              transform="translate(0 -112.86)"
              opacity={0.2}
            />
            <path
              className="cls-2"
              d="M292,321.91C259,323,212.77,341.7,197.23,378.33H471.5V204.27c-40-.65-78.08,20.36-91,56.79C366.36,301.19,331,320.63,292,321.91Z"
              transform="translate(0 -112.86)"
              opacity={0.4}
            />
          </g>
        </g>
      </svg>

      <div className="body-container">
        <div className="body-item" style={{ flex: 1 }}>
          <h1 className="home-header">Welcome to</h1>
          <h1 className="home-header-2">
            Machine Learning based Self-Monitoring of Mental Bloom based on
            Expert Perspectives and Student Experiences
          </h1>
          <p>
            Welcome to our disease prediction website, where we help you
            determine your mental health condition with ease. Our website is
            designed to make mental health assessment more accessible to
            everyone, using a simple yet effective questionnaire. We understand
            how difficult it can be to recognize and address mental health
            concerns, which is why we provide a confidential and personalized
            approach to help you better understand your mental state. Our team
            of professionals has developed an algorithm that takes into account
            your responses to the questionnaire and predicts your likelihood of
            having a mental health condition. We are committed to providing a
            safe and secure platform to assist you in your journey towards
            improved mental well-being.
          </p>
          <button className="submitButton" onClick={handleClick}>
            Get Started
          </button>

          <div className="dashboard-container">
            <div className="dashboard-box">
              <FaUser className="dashboard-icon" />
              <div className="dashboard-info">
                <p className="dashboard-count">{responseData.usersCount}</p>
                <p className="dashboard-label">Active Users</p>
              </div>
            </div>
            <div className="dashboard-box">
              <FaBrain className="dashboard-icon" />
              <div className="dashboard-info">
                <p className="dashboard-count">{responseData.modelUsedCount}</p>
                <p className="dashboard-label">Models Used</p>
              </div>
            </div>
            <div className="dashboard-box" style={{ alignSelf: "center" }}>
              <BsGraphUp className="dashboard-icon" />
              <div className="dashboard-info">
                <p className="dashboard-count">{responseData.accuracy}</p>
                <p className="dashboard-label">Accuracy</p>
              </div>
            </div>
          </div>
          <p>Team Members</p>
          <div className="dashboard-container">
            <div className="imageBox">
              <img className="personImage" src={image1} alt="Person1" />
              <p className="dashboard-label">Amani Nazir  [1HK19CS017]</p>
            </div>
            <div className="imageBox">
              <img className="personImage" src={image2} alt="Person2" />
              <p className="dashboard-label">Arbiya Fathima [1HK19CS025]</p>
            </div>
            <div className="imageBox">
              <img className="personImage" src={image3} alt="Person3" />
              <p className="dashboard-label">Arshiya Tabassum [1HK19CS027]</p>
            </div>
            <div className="imageBox">
              <img className="personImage" src={image4} alt="Person4" />
              <p className="dashboard-label">Fathima Fida T V [1HK19CS049]</p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="doctorImage" src={doctorImage} alt="Doctor" />
        </div>
      </div>
    </div>
  );
}

export default Home;
