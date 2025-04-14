import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Projects from "../projects/Projects";
import TopBar from "../topbar/TopBar";
import Categories from "../categories/Categories";
import Content from "../content/Content";
import 'react-datepicker/dist/react-datepicker.css';

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar/>
        <Projects/>
        <main className="main">
          <div className="main-container">
            <TopBar/>
            <Categories/>
            <Content/>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;


