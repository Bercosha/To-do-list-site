import React, { useState } from "react";
import PageDots from "../page-dots/PageDots";
import SidebarItem from "../sidebar-item/SidebarItem";

const items = [
  {id: 'logo', icon: "/images/logo.svg"},
  {id: 'general', icon: "/images/box-icon.svg"},
  {id: 'profile', icon: "/images/profile-icon.svg"},
  {id: 'calendar', icon: "/images/calendar-icon.svg"},
  {id: 'statistics', icon: "/images/statistic-icon.svg"},
  {id: 'download', icon: "/images/download-icon.svg"},
  {id: 'map', icon: "/images/map-icon.svg"},
  {id: 'settings', icon: "/images/settings-icon.svg"},
  {id: 'logout', icon: "/images/exit-icon.svg"},
]

const Sidebar = () => {
  const [activeId, setActiveId] = useState('general');
  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length-1];

  return (
    <div style={{ width: "80px", 
    background: "#1C1D22", 
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: "20px 0",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 100, 
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PageDots />
      {topItems.map((item, index) => (
        <SidebarItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          isLogo={index === 0}
          isActive={item.id === activeId}
          onClick={setActiveId}
        />
      ))}
      </div>
      <SidebarItem
        id={bottomItem.id}
        icon={bottomItem.icon}
        isActive={bottomItem.id === activeId}
        onClick={setActiveId}
      />
    </div>

  )
}

export default Sidebar;