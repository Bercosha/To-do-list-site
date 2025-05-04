import { useState, useRef, useEffect } from 'react';
import './TaskCard.css';

const TaskCard = ({id, title, description, progress, date, onRename, onDelete}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const detailsRef = useRef(null);

  const renameInputRef = useRef(null);

  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
    }
  }, [isRenaming]);

  const getProgressColor = (value) => {
    if (value >= 1 && value <= 4) return '#FF7979'; 
    if (value >= 5 && value <= 7) return '#FFA048'; 
    if (value === 8 || value === 9) return '#A0E14A';
    if (value === 10) return '#78D700'; 
    return 'transparent'; 
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });



  const handleRenameClick = () => {
    setIsRenaming(true);
    setShowDetails(false);
  }

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting rename:", newTitle); // Проверка, что вызывается
    fetch(`http://localhost:3002/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(res => res.json())
      .then(data => {
        onRename(id, newTitle); // Вызывается здесь
      })
      .catch(err => console.error("Error renaming task:", err));
    setIsRenaming(false);
  };
  
  const handleDeleteClick = () => {
    console.log("Deleting task with id:", id); // Проверка, что вызывается
    fetch(`http://localhost:3002/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDelete(id); // Вызывается здесь
      })
      .catch(err => console.error("Error deleting task:", err));
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDetails]);

  return (
    <div className="task-card">
      <div className='task-card__container'>
        <div className="task-card__header">
          <div className="task-card__title-container">
            {isRenaming ? (
              <form onSubmit={handleRenameSubmit}>
                <input
                  type="text"
                  ref={renameInputRef}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className='task-card__rename-input'/>
                </form>
            ) : (
              <>
              <h3 className="task-card__title">{title}</h3>
              <p className="task-card__description">{description}</p>
              </>
            )}
          </div>
          <div className='task-card__icon-container'>
            <img src="../images/more-icon.svg" alt="more-icon" className="task-card__icon" onClick={() => setShowDetails(!showDetails)}/>
            {
              showDetails && (
                <div className='details-container' ref={detailsRef}>
                  <div className='details-item' onClick={handleRenameClick}>
                    <img className='details-rename__icon' src="../images/rename.svg" alt="rename-icon"/>
                    <p className='details-rename__text'>Rename</p>
                  </div>
                  <div className='details-item' onClick={handleDeleteClick}>
                    <img className='details-delete__icon' src="../images/trash.svg" alt="delete-icon"/>
                    <p className='details-delete__text'>Delete</p>
                  </div>
                </div>
              )
            }
          </div>
          
        </div>
        <div className='progress-info'>
          <div className='progress-info__container'>
            <img className='progress-info__icon' src="../images/list-icon.svg" alt="list-icon"/>
            <p className='progress-info__text'>Progress</p>
          </div>
          <p className='progress-info__text'>{progress}/10</p>
        </div>
        <div className="task-card__progress-bar">
          <div className="task-card__progress" style={{width: `${(progress * 10)}%`, backgroundColor: getProgressColor(progress),}}></div>
        </div>
        <p className="task-card__date">{formattedDate}</p>
      </div>
    </div>
  )
}

export default TaskCard;