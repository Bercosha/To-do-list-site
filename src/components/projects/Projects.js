import { useState } from "react";
import ProjectList from "../project-list/ProjectList";

import "./Projects.css";

const Projects = ( { tasks, onCategorySelect } ) => {
  const countByStatus = (status) => tasks.filter(task => task.status === status).length;
  const totalCount = tasks.length;

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


  const taskList = [
    { id: 0, name: `All Tasks (${totalCount})`, status: "all" },
    { id: 1, name: `To do (${countByStatus("to do")})`, status: "to do" },
    { id: 2, name: `In progress (${countByStatus("in progress")})`, status: "in progress" },
    { id: 3, name: `Done (${countByStatus("done")})`, status: "done" },
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
          items={taskList}
          defaultOpen={true}
          activeId={activeTaskId}
          setActiveId={(id) => {
            setActiveTaskId(id);
            const selectedItem = taskList.find(item => item.id === id);
            if (selectedItem) {
              onCategorySelect(selectedItem.status);
            }
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