import './ProjectItem.css';

const ProjectItem = (props) => {
  const { id, name, isActive, onClick } = props;
  return (
    <li className={`project-item__wrapper ${isActive ? 'active' : ""}`} onClick={() => onClick(id)}>
      <h4 className="project-item">{name}</h4>
    </li>
  );
}

export default ProjectItem;