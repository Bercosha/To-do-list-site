import React, { useEffect, useState, useRef } from "react";
import ViewsItem from "../views-item/ViewsItem";
import "./ViewsList.css";

const ViewsList = () => {
  const initialItems = [
    { id: 1, name: "Board view", icon: "/images/board-icon.svg" },
    { id: 2, name: "Add view", icon: "/images/plus-view.svg", isAddView: true },
  ];

  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState(1);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(null);
  const [deleteButtonPosition, setDeleteButtonPosition] = useState({left: 0, top: 0})
  const containerRef = useRef(null);
  const deleteButtonRef = useRef(null); 

  // Add items
  const handleAddView = () => {
    const newBoardView = {
      id: items.length + 1,
      name: "Board view",
      icon: "/images/board-icon.svg",
    }

    const updatedItems = items.filter(item => !item.isAddView);
    updatedItems.push(newBoardView, {id: items.length + 2, name: "Add view", icon: "/images/plus-view.svg", isAddView: true});

    setItems(updatedItems);
  }

  // Underline
  const handleHover = (e) => {
    const item = e.currentTarget;
    setUnderlineStyle({
      left: item.offsetLeft,
      width: item.offsetWidth
    });
  };

  const resetUnderline = () => {
    const activeElement = containerRef.current.querySelector('.active');
    if (activeElement) {
      setUnderlineStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth
      })
    }
  }

  useEffect(() => {
    resetUnderline();
    window.addEventListener('resize', resetUnderline);
    return () => window.removeEventListener('resize', resetUnderline);
  }, [])

  // Delete button
  const handleRightClick = (e, id, isAddView) => {
    e.preventDefault();
    if (isAddView) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setDeleteButtonPosition({ 
      left: mouseX - 340, 
      top: mouseY - 90
    });
    setShowDeleteButton(id); // показываю кнопку удаления
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setShowDeleteButton(null);
  }

  // Click outside delete button
  const handleClickOutside = (e) => {
    if (deleteButtonRef.current && !deleteButtonRef.current.contains(e.target)) {
      setShowDeleteButton(null);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  return (
    <div className="views-list" ref={containerRef}>
      <div className="views-underline" style={underlineStyle}></div>
      {items.map(item => (
        <ViewsItem 
        key={item.id} 
        id={item.id} 
        name={item.name} 
        icon={item.icon}
        isActive={item.id === activeId}
        isAddView={item.isAddView} 
        onClick={setActiveId}
        onMouseEnter={handleHover}
        onMouseLeave={resetUnderline}
        onAddView={handleAddView}
        onRightClick={(e) => handleRightClick(e, item.id, item.isAddView)}/>
      )
      )}
      {showDeleteButton !== null && (
        <button
          ref={deleteButtonRef}
          className="delete-btn"
          style={{ left: deleteButtonPosition.left, top: deleteButtonPosition.top }}
          onClick={() => handleDelete(showDeleteButton)} // Удаление элемента по ID
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default ViewsList;