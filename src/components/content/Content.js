import { useState, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import "./Content.css";

const Content = () => {
  const columns = [
  { title: "To do", key: "to do" },
  { title: "In progress", key: "in progress" },
  { title: "Done", key: "done" }
  ];
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new ui presentation",
      description: "Dribble marketing",
      status: "to do", // ← колонка, в которой находится задача
      progress: 0 // 0–10 или можно сразу в процентах
    },
    {
      id: 2,
      title: "Сделать хедер",
      description: "",
      status: "in progress",
      progress: 5
    },
    {
      id: 3,
      title: "Протестировать API",
      description: "",
      status: "done",
      progress: 10
    },
    {
      id: 1,
      title: "Сделать лендинг",
      description: "Главная страница + адаптив",
      status: "to do", // ← колонка, в которой находится задача
      progress: 2 // 0–10 или можно сразу в процентах
    },
    {
      id: 2,
      title: "Сделать хедер",
      description: "",
      status: "in progress",
      progress: 7
    },
    {
      id: 3,
      title: "Протестировать API",
      description: "",
      status: "done",
      progress: 10
    },
    {
      id: 1,
      title: "Сделать лендинг",
      description: "Главная страница + адаптив",
      status: "to do", // ← колонка, в которой находится задача
      progress: 4 // 0–10 или можно сразу в процентах
    },
    {
      id: 2,
      title: "Сделать хедер",
      description: "",
      status: "in progress",
      progress: 8
    },
    {
      id: 3,
      title: "Протестировать API",
      description: "",
      status: "done",
      progress: 10
    }
    
  ]);

  useEffect(() => {
    setTasks(prevTasks => prevTasks.map(task => task.progress >= 10 && task.status !== 'done' ? { ...task, status: 'done' } : task))
  }, [tasks])

  return (
    <div className="content">
      {columns.map(column => (
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