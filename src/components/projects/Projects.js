import { useState } from "react";
import ProjectList from "../project-list/ProjectList";

import "./Projects.css";

const Projects = ( { onCategorySelect } ) => {
  const team = [
    { id: 1, name: "All Teams (3)" },
    { id: 2, name: "Design" },
    { id: 3, name: "Development" },
    { id: 4, name: "Product" },
  ];

  const projects = [
    { id: 1, name: "All Projects (3)" },
    { id: 2, name: "Tasks" },
    { id: 3, name: "User flow" },
    { id: 4, name: "Ux research" },
  ];


  const tasks = [
    { id: 1, name: "All Tasks (3)" },
    { id: 2, name: "To do (4)" },
    { id: 3, name: "In progress (4)" },
    { id: 4, name: "Done (3)" },
  ];

  const reminders = [
    { id: 1, name: "All Reminders (3)" },
    { id: 2, name: "Reminder 1 (4)" },
    { id: 3, name: "Reminder 2 (4)" },
    { id: 4, name: "Reminder 3 (3)" },
  ];

  const messengers = [
    { id: 1, name: "All Messengers (3)" },
    { id: 2, name: "Messenger 1 (4)" },
    { id: 3, name: "Messenger 2 (4)" },
    { id: 4, name: "Messenger 3 (3)" },
  ]

  const [activeTaskId, setActiveTaskId] = useState(tasks.length > 0 ? tasks[0].id : null);

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Projects</h2>
          <img className="projects-plus__img" src="../images/plus-icon.svg" alt="plus icon"/>
        </div>

        <ProjectList title="Team" items={team}/>
        <ProjectList title="Projects" items={projects}/>
        <ProjectList
          title="Tasks"
          items={tasks}
          defaultOpen={true}
          activeId={activeTaskId}
          setActiveId={(id) => {
            setActiveTaskId(id);

            const selectedItem = tasks.find(item => item.id === id);
            const name = selectedItem?.name?.toLowerCase();
            if (name.includes("to do")) onCategorySelect("to do");
            else if (name.includes("in progress")) onCategorySelect("in progress");
            else if (name.includes("done")) onCategorySelect("done");
            else onCategorySelect("all");
          }}
        />
        <ProjectList title="Reminders" items={reminders}/>
        <ProjectList title="Messengers" items={messengers}/>
        <div class="spacer"></div>
      </div>
    </div>
  )
}

export default Projects;