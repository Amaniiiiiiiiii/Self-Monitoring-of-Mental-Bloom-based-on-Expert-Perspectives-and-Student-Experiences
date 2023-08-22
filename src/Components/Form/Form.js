import React, { useState, useContext, useEffect } from "react";
import "./Form.css";
import doctorImage from "../../Resources/doctor.png";
import { TbLoader3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import MyContext from "../MyContext";

const Form = (props) => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const questions = [
    "Feeling  Low/Sad",
    "Confused / Reduced Concentration",
    "Extreme Feelings of regret",
    "Extreme Mood Changes",
    "Withdrawal from Friends/Activities",
    "Significant Tiredness",
    "An experience in which you see, hear, feel, or smell something that does not exist",
    "Unable to cope with daily stress",
    "Substance Abuse(Smoking,drug usage, alcohol consumption)",
    "Changes in eating habits",
    "Excess of emotions (Anger, Guilt, Violence)",
    "Suicidal Thoughts",
    "Drop in functioning ",
    "Increased Sensitvity",
    "Nervousness",
    " Exhibiting sickness without any apparent reason.",
    "Reduced Immunity",
    "Change in sleeping patterns",
    "Any other feeling not listed above?",
  ];
  const answers = [
    "Not applicable",
    "Days",
    "Weeks",
    "Months",
    "Half a Year",
    "An Entire Year",
    "More than a Year",
  ];

  const defaultAnswers = Array(questions.length).fill("Not applicable");
  defaultAnswers[defaultAnswers.length - 1] = "";
  const [selectedAnswers, setSelectedAnswers] = useState(defaultAnswers);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!context.user) {
      navigate("/");
    }
  }, [context.user, navigate]);

  const handleInputChange = (e, index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = e.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSpinner((flag) => !flag);

    fetch(`http://localhost:8000/predict_disease/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: selectedAnswers }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //   console.log(data)
          context.setData({ disease: data.disease, tasks: data.tasks });
          navigate("/task");
        }
        setSelectedAnswers(defaultAnswers);
        setShowSpinner((flag) => !flag);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container-form">
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
            <stop offset="0" stopColor="#b700ff" />
            <stop offset="1" stopColor="#fff" />
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
              className="cls-1-form"
              d="M147.6,378.33H471.5V112.86c-30,3.86-47.92,27.77-53.72,40.67-9,20-24,32.75-50.75,29.5s-42.75,4.5-59.25,39.25c-14.55,30.62-30.25,23.25-91.75,38s-44.5,55.5-57.25,97.39A58.23,58.23,0,0,1,147.6,378.33Z"
              transform="translate(0 -112.86)"
              opacity={0.2}
            />
            <path
              className="cls-2-form"
              d="M292,321.91C259,323,212.77,341.7,197.23,378.33H471.5V204.27c-40-.65-78.08,20.36-91,56.79C366.36,301.19,331,320.63,292,321.91Z"
              transform="translate(0 -112.86)"
              opacity={0.4}
            />
          </g>
        </g>
      </svg>

      <div className="body-container-form">
        <div className="body-item-form" style={{ flex: 1 }}>
          <h1 className="form-header">How have you been feeling lately?</h1>
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div className="question-container" key={index}>
                <label className="question">{question}</label>
                {index === questions.length - 1 ? (
                  <input
                    className="answer"
                    style={{ paddingLeft: 0 }}
                    type="text"
                    value={selectedAnswers[index]}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  <select
                    className="answer"
                    value={selectedAnswers[index]}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    {answers.map((answer) => (
                      <option value={answer}>{answer}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <div className="question-container">
              <div style={{ flex: 1 }} />
              <button className="submitButton-form">Submit</button>
            </div>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="doctorImage-form" src={doctorImage} alt="Doctor" />
        </div>
      </div>
      {showSpinner && (
        <div className="spinner-form">
          <div style={{ animation: "spin 1s linear infinite" }}>
            <TbLoader3 size={48} color="#8e2de2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
