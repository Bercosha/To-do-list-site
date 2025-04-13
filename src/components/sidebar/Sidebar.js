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

  return (
    <div style={{ width: "80px", background: "#1C1D22", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PageDots />
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          isActive={item.id === activeId}
          onClick={setActiveId}
        />
      ))}
    </div>

  )
}

export default Sidebar;