import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../task-card/TaskCard";

const DraggableTaskCard = React.memo(({ task, onRename, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none"
  };

  const handleDragStart = (e) => {
    e.currentTarget.style.cursor = "grabbing";
  }

  const handleDragEnd = (e) => {
    e.currentTarget.style.cursor = "grab";
  }

  return (
    <div 
    ref={setNodeRef} 
    style={style} 
    {...attributes} 
    {...listeners} 
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}>
      <TaskCard {...task} onRename={onRename} onDelete={onDelete}/>
    </div>
  );
});

export default DraggableTaskCard;
