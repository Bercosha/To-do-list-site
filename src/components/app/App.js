import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Projects from "../projects/Projects";
import TopBar from "../topbar/TopBar";
import Categories from "../categories/Categories";
import Content from "../content/Content";
import 'react-datepicker/dist/react-datepicker.css';

import "./App.css";



const App = () => {

  const [selectedTaskCategory, setSelectedTaskCategory] = useState("all");
  return (
    <Router>
      <div className="app">
        <Sidebar/>
        <Projects onCategorySelect={setSelectedTaskCategory} />
        <main className="main">
          <div className="main-container">
            <TopBar/>
            <Categories/>
            <Content selectedCategory={selectedTaskCategory}/>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;


