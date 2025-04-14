import React, { useState } from "react";
import ProjectItem from "../project-item/ProjectItem";
import "./ProjectList.css";

const ProjectList = ({title, items, defaultOpen = false}) => {

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeId, setActiveId] = useState(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="project-list">
      <div 
      className={`project-list__header ${isOpen ? 'active' : ""}`}
      onClick={toggleList}>
        <h3 className="project-title">{title}</h3>
        <img className="arrow" src="../images/arrow-bottom.svg" alt="arrow"/>
      </div>
        <div className={`project-list__items ${isOpen ? 'open' : 'closed'}`}>
        {items.map((item) => (
          <ProjectItem key={item.id} id={item.id} name={item.name} isActive={item.id === activeId} onClick={setActiveId}/>
        ))}
        </div>
    </div>
  )
}

export default ProjectList;