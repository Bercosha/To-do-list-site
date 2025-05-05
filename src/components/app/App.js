import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Projects from "../projects/Projects";
import TopBar from "../topbar/TopBar";
import Categories from "../categories/Categories";
import Content from "../content/Content";
import 'react-datepicker/dist/react-datepicker.css';

import "./App.css";



const App = () => {

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3002/tasks")
      .then(res => res.json())
      .then(data => {
        const updated = data.map(task => 
          task.progress >= 10 && task.status !== 'done' ? { ...task, status: 'done' } : task
        );
        setTasks(updated);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Router>
      <div className="app">
        <Sidebar/>
        <Projects tasks={tasks} setTasks={setTasks} onCategorySelect={setSelectedCategory} />
        <main className="main">
          <div className="main-container">
            <TopBar/>
            <Categories/>
            <Content selectedCategory={selectedCategory} tasks={tasks} setTasks={setTasks}/>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;


