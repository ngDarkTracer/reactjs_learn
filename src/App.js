import { useState, useContext } from 'react';
import { Route, Routes } from "react-router-dom"

import './App.css';
import Navbar from "./Navbar";
import NotDone from "./routes/NotDone";
import Done from "./routes/Done"

import PrimeReact from 'primereact/api';
import {TasksContext} from "./services/tasks-context";

PrimeReact.ripple = true;
PrimeReact.cssTransition = true;

function App() {

    const [todoList, setTodoTask] = useState([
        {
            id: 0,
            title: 'Learn react',
            status: false
        },
        {
            id: 1,
            title: 'Learn again',
            status: false
        }
    ]);

  return (
      <div>
          <TasksContext.Provider value={[todoList, setTodoTask]}>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Done />} />
                  <Route path="/Done" element={<Done />} />
                  <Route path="/NotDone" element={<NotDone />} />
              </Routes>
          </TasksContext.Provider>
      </div>
  )
}

export default App;
