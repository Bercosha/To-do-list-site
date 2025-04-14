import CalendarDisplay from '../calendar-display/CalendarDisplay';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <h2 className="top-bar__title">Welcome back, Dan 👋</h2>
      <div className="top-bar__nav">
          <img src="../images/search-icon.svg" alt="search-icon" className="top-bar__icon" />
          <img src="../images/notification-icon.svg" alt="notification-icon" className="top-bar__icon" />
          <div className="calendar-container">
            <CalendarDisplay />
          </div>
          <img src="../images/profile.png" alt="profile-icon" className="profile-icon" />
      </div>
    </div>
  )
}

export default TopBar;