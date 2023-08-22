import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //client side routing 
import { useState } from "react";
import Authentication from "./Components/Authentication";
import Home from "./Components/Home";
import Form from "./Components/Form";
import Task from "./Components/Task";
import MyContext from "./Components/MyContext";

function App() {
  const [data, setData] = useState({ disease: "", tasks: "" });
  const [user, setUser] = useState(false); // not getting saved to each user 
  return (
    <MyContext.Provider value={{ data, setData, user, setUser }}>      /*redirecting after verifying user details*/
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/authentication" element={<Authentication />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/task" element={<Task />} />
          <Route exact path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;

  /*13 redirecting after verifying user details*/
/* direction flow of website */