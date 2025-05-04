import './TaskCard.css';

const TaskCard = ({id, title, description, progress, date}) => {
  const getProgressColor = (value) => {
    if (value >= 1 && value <= 4) return '#FF7979'; // Красный
    if (value >= 5 && value <= 7) return '#FFA048'; // Оранжевый
    if (value === 8 || value === 9) return '#A0E14A'; // Переход к зелёному (мягкий цвет)
    if (value === 10) return '#78D700'; // Зелёный
    return 'transparent'; // 0 или некорректное значение
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })

  return (
    <div className="task-card">
      <div className='task-card__container'>
        <div className="task-card__header">
          <div className="task-card__title-container">
            <h3 className="task-card__title">{title}</h3>
            <p className="task-card__description">{description}</p>
          </div>
          <img src="../images/more-icon.svg" alt="more-icon" className="task-card__icon" />
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