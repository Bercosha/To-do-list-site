import './ViewsItem.css'

const ViewsItem = ({ icon, id, name, isActive, onClick, onMouseEnter, onMouseLeave, isAddView, onAddView, onRightClick }) => {
  return (
    <div
      className={`views-item ${isActive ? 'active' : ""}`}
      onClick={isAddView ? onAddView : () => onClick(id)}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
      onContextMenu={(e) => onRightClick(e, id)}
    >
      <img className='views-item__img' src={icon} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default ViewsItem;