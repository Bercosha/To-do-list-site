import React from "react";
import styles from "./SidebarItem.module.css"; 

const SidebarItem = ({ id, icon, isActive, onClick, isLogo }) => {
  return (
    <div
      className={`${styles.item} ${isActive ? styles.active : ""} ${isLogo ? styles.logo : ""}`}
      onClick={() => onClick(id)}
    >
      <img
        src={icon}
        alt={id}
        className={styles.icon}
      />
    </div>
  );
};

export default SidebarItem;