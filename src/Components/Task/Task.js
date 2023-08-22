import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "../../Resources/doctor.png";
import "./Task.css";
import MyContext from "../MyContext";
import Dialog from "./Dialog";

const Task = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const diseaseDescription = {
    stress:
      "Stress can be defined as a state of worry or mental tension caused by a difficult situation. Stress is a natural human response that prompts us to address challenges and threats in our lives. Everyone experiences stress to some degree. The way we respond to stress, however, makes a big difference to our overall well-being.",
    psychosis:
      "Psychosis is a loss of contact with reality. Hallucinations and delusions are its most common symptoms. It is present in many conditions, including schizophrenia and bipolar disorder.",
    "sleep disorder":
      "Sleep disorders (or sleep-wake disorders) involve problems with the quality, timing, and amount of sleep, which result in daytime distress and impairment in functioning. Sleep-wake disorders often occur along with medical conditions or other mental health conditions, such as depression, anxiety, or cognitive disorders. There are several different types of sleep-wake disorders, of which insomnia is the most common. Other sleep-wake disorders include obstructive sleep apnea, parasomnias, narcolepsy, and restless leg syndrome.",
    anxiety:
      "A feeling of worry, nervousness, or unease about something with an uncertain outcome.",
    depression:
      "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest.",
    "eating disorder":
      "An eating disorder is a mental disorder defined by abnormal eating behaviors that negatively affect a person's physical or mental health.",
    loneliness:
      "Loneliness is feeling sad and unhappy about being socially isolated. Because it has no single common cause, the prevention and treatment of this potentially damaging state of mind can vary dramatically.",
    "panic disorder":
      "Panic disorder is an anxiety disorder where you regularly have sudden attacks of panic or fear. Everyone experiences feelings of anxiety and panic at certain times. It's a natural response to stressful or dangerous situations.",
    "substance abuse":
      "Excessive use of psychoactive drugs, such as alcohol, pain medications or illegal drugs which leads to physical, social or emotional harm.",
  };

  useEffect(() => { // checks if user is logged in 
    if (!context.user) {
      navigate("/");
    }
  }, [context.user, navigate]);

  const [tasksDone, setTasksDone] = useState(0); // tasks yes diye toh 
  const [showDialog, setShowDialog] = useState(false);// shows this dialogue
  const [isNo, setIsNo] = useState(false);//no raha toh
  const [dialogMessage, setDialogMessage] = useState(""); //displays input box

  const [taskDisabled, setTaskDisabled] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  const handleYesCLick = (index) => {
    console.log(taskDisabled);
    const temp = taskDisabled;
    temp[index] = [true, true, false, true];
    setTaskDisabled(temp); // temp disable tasks input 

    setIsNo(false); 
    setDialogMessage("Good job!");
    setShowDialog(true);
  };

  const handleNoCLick = (index) => {
    const temp = taskDisabled;
    temp[index] = [false, true, true, true];
    setTaskDisabled(temp); // tasks is getting disabled and then pop is displayed 

    setIsNo(true);
    setDialogMessage("Reason");
    setShowDialog(true);
  };

  const [allTasksDone, setAllTasksDone] = useState(false);
  const handleContinue = () => {
    if (allTasksDone) {
      navigate("/home"); // redirection to home after displaying msg on completing all tasks is coded here 
    }
    if (tasksDone === context.data.tasks.length - 1) {
      setAllTasksDone(true);
      setIsNo(false);
      setDialogMessage(
        "You are amazing for facing this with so much courage and hope. The most important thing right now is to focus on getting better… everything else can wait. You're being so strong—and patient. Keep the faith. Things are going to start looking up soon. Now you will be redirected to the home page."
      );
    } else {
      setShowDialog(false);
      setTasksDone((task) => task + 1); // models used count is increasing here
    }
  };

  const handleNumber = () => {
    window.location.href = "http://healthcollective.in/contact/helplines/";
  };

  const redirectToHome = () => {
    navigate("/home");
  };

  return (
    <div className="container-task">
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
              className="cls-1-task"
              d="M147.6,378.33H471.5V112.86c-30,3.86-47.92,27.77-53.72,40.67-9,20-24,32.75-50.75,29.5s-42.75,4.5-59.25,39.25c-14.55,30.62-30.25,23.25-91.75,38s-44.5,55.5-57.25,97.39A58.23,58.23,0,0,1,147.6,378.33Z"
              transtask="translate(0 -112.86)"
              opacity={0.2}
            />
            <path
              className="cls-2-task"
              d="M292,321.91C259,323,212.77,341.7,197.23,378.33H471.5V204.27c-40-.65-78.08,20.36-91,56.79C366.36,301.19,331,320.63,292,321.91Z"
              transtask="translate(0 -112.86)"
              opacity={0.4}
            />
          </g>
        </g>
      </svg>

      <div className="body-container-task">
        <div className="body-item-task" style={{ flex: 1 }}>
          <div className="diagnosis-container">
            <h1 className="task-header task-diagnostic">Diagnosis:</h1>
            <h1 className="task-header">
              {context.data.disease !== ""
                ? context.data.disease
                : "You are doing great! Continue to look after yourself!"}
            </h1>
          </div>
          {context.data.disease !== "" && (
            <>
              <p
                className="task-p"
                style={{ paddingLeft: "5rem", marginBottom: "3rem" }}
              >
                {diseaseDescription[context.data.disease.toLowerCase()]}
              </p>
              <p className="task-p" style={{ color: "#aaaaaa" }}>
                In order to help you overcome the above diagnosis you can try
                these tasks :
              </p>
            </>
          )}

          {context.data.tasks.map((task, index) => (
            <div className="single-task-container" key={index}>
              <label className="task-description">{task}</label>

              <div className="buttons-container-tasks">
                <p className="task-p2">Have you completed this task: </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <button
                    disabled={taskDisabled[index][3]}
                    className={
                      taskDisabled[index][2]
                        ? "isChecked"
                        : "submitButton-task-no"
                    }
                    onClick={() => {
                      handleNoCLick(index);
                    }}
                  >
                    No
                  </button>
                  <button
                    disabled={taskDisabled[index][1]}
                    className={
                      taskDisabled[index][0]
                        ? "isChecked"
                        : "submitButton-task-yes"
                    }
                    onClick={() => {
                      handleYesCLick(index);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          ))}
          {context.data.disease === "" && (
            <div style={{width:'100%', display:'flex', justifyContent:'center', margin:'5rem'}}>
              <button style={{width:'10rem'}}
                className="submitButton-task-yes"
                onClick={redirectToHome}
              >
                Go Home
              </button>
            </div>
          )}

          <span className="redirectButton" onClick={handleNumber}>
            Click Here for Mental Health Helpline Numbers
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="doctorImage-task" src={doctorImage} alt="Doctor" />
        </div>
      </div>

      {showDialog && (
        <Dialog
          className="spinner-task"
          handleContinue={handleContinue}
          showInput={isNo}
          dialogMessage={dialogMessage}
        />
      )}
    </div>
  );
};

export default Task;
