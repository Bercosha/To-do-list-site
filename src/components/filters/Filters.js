import './Filters.css';

const Filters = () => {
  return (
    <div className="filters">
      <h3 className='filters-item active'>Filter</h3>
      <h3 className='filters-item'>Sort</h3>
      <img src="../images/more-icon.svg" alt="more-icon" className="more__icon" />
      <button className="filters__button">New template</button>
    </div>
  )
}

export default Filters;