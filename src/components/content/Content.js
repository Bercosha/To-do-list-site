import { useState, useMemo, useCallback } from "react";
import { DndContext, useSensor, useSensors, PointerSensor, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableTaskCard from "../draggableTaskCard/DraggableTaskCard";
import DroppableColumn from "../droppableColumn/DroppableColumn";
import "./Content.css";

const columns = [
  { title: "To do", key: "to do" },
  { title: "In progress", key: "in progress" },
  { title: "Done", key: "done" }
];
const Content = ({ selectedCategory, tasks, setTasks }) => {
  

  const [activeId, setActiveId] = useState(null);
  
  const getColumnClass = (columnKey) => {
    if (selectedCategory === "all") {
      return "vertical";  
    } else if (selectedCategory === columnKey) {
      return "horizontal";  
    }
    return "vertical";  
  };

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);

    if (!activeTask || !overTask) return;

    // Если внутри одной колонки
    if (activeTask.status === overTask.status) {
      const columnTasks = tasks.filter(task => task.status === activeTask.status);
      const oldIndex = columnTasks.findIndex(task => task.id === active.id);
      const newIndex = columnTasks.findIndex(task => task.id === over.id);
      const newColumnTasks = arrayMove(columnTasks, oldIndex, newIndex);

      const newTasks = [
        ...tasks.filter(task => task.status !== activeTask.status),
        ...newColumnTasks
      ];
      setTasks(newTasks);
    } else {
      // Если колонка меняется
      const updatedTask = { ...activeTask, status: overTask.status };
      const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      setTasks(newTasks);

      fetch(`http://localhost:3002/tasks/${updatedTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: overTask.status }),
      }).catch(err => {
        console.error("Error updating task status:", err);
      })
    }
  }, [tasks, setTasks]);

  const handleDragOver = useCallback((event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);

    if (!activeTask || !overTask) return;

    // Если колонка меняется
    if (activeTask.status !== overTask.status) {
      const updatedTask = { ...activeTask, status: overTask.status };
      const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      setTasks(newTasks);
    }
  }, [tasks, setTasks]);

  const columnTasksMap = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.key] = tasks.filter(task => task.status === col.key);
      return acc;
    }, {});
  }, [tasks]);

  /* const columnTasksMap = useMemo(() => {
    return columns.reduce((acc, col) => {
      if (col.key === "in progress") {
        acc[col.key] = tasks.filter(task => task.progress >= 1 && task.progress <= 9);
      } else if (col.key === "done") {
        acc[col.key] = tasks.filter(task => task.progress === 10);
      } else if (col.key === "to do") {
        acc[col.key] = tasks.filter(task => task.progress === 0);
      }
      return acc;
    }, {});
  }, [tasks, columns]); */

  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0
      }
    })
  )

  const visibleColumns = selectedCategory === "all"
    ? columns
    : columns.filter(col => col.key === selectedCategory);

  const handleAddTask = (status) => {
    const randomTitles = ["Do magic", "Learn React", "Write docs", "Refactor code", "Fix bug"];
    const randomDescriptions = ["Auto-generated task", "No description", "Just do it", "Optional", "For test"];

    const newTask = {
      id: Date.now(),
      title: randomTitles[Math.floor(Math.random() * randomTitles.length)],
      description: randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)],
      progress: Math.floor(Math.random() * 11),
      status: status,
      date: new Date().toISOString()
    };

    // Добавляю данные в db.json
    fetch(`http://localhost:3002/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        setTasks(prev => [data, ...prev]);
      })
      .catch(err => console.error("Error adding task:", err));
  }

  return (
    <div className={`content`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(event) => {
          setActiveId(event.active.id);
          document.body.style.cursor = 'grabbing';
        }}
        onDragOver={handleDragOver}
        onDragEnd={(event) => {
          setActiveId(null);
          handleDragEnd(event);
          document.body.style.cursor = "auto";
        }}
      >
        {visibleColumns.map(column => {
          const columnTasks = columnTasksMap[column.key];
          const columnClass = getColumnClass(column.key);
          return (
            <DroppableColumn 
            key={column.key} 
            id={column.key} 
            items={columnTasks.map(task => task.id)}
            columnClass={columnClass}>
              <div className="column-title__container">
                <h3 className="column-title">{column.title}</h3>
                <div className="column-title__add-task" onClick={() => handleAddTask(column.key)}>
                  <img className="column-title__icon" src="../images/plus-view.svg" alt="more-icon" />
                  <p className="column-title__text">Add new task</p>
                </div>
              </div>
              <SortableContext items={columnTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {columnTasks.map(task => (
                  <DraggableTaskCard 
                  key={task.id} 
                  task={task} 
                  isActive={activeId === task.id}
                  onRename={(id, newTitle) => {
                    console.log("Renaming task with id:", id, "to new title:", newTitle);
                    setTasks(prev => prev.map(task => task.id === id ? { ...task, title: newTitle} : task));
                  }}
                  
                  onDelete={(id) => {
                    console.log("Deleting task with id:", id);
                    setTasks(prev => prev.filter(task => task.id !== id));
                  }}/>
                ))}
              </SortableContext>
            </DroppableColumn>
          )
        })}
      </DndContext>
    </div>
  );
}

export default Content;
