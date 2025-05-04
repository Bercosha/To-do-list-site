import { useState, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import "./Content.css";

const Content = ({ selectedCategory }) => {
  const columns = [
  { title: "To do", key: "to do" },
  { title: "In progress", key: "in progress" },
  { title: "Done", key: "done" }
  ];

  const [tasks, setTasks] = useState([]);

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
  }, [])

  const visibleColumns = selectedCategory === "all"
  ? columns
  : columns.filter(col => col.key === selectedCategory);

  return (
    <div className="content">
      {visibleColumns.map(column => (
        <div key={column.key} className="column">
          <h3 className="column-title">{column.title}</h3>
          {tasks
            .filter(task => task.status === column.key)
            .map(task => (
              <TaskCard key={task.id} {...task} />
            ))}
        </div>
      ))}
    </div>
  )
}

export default Content;