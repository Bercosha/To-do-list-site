import ViewsList from "../views-list/ViewsList";
import Filters from "../filters/Filters";
import './Categories.css';

const Categories = () => {
  return (
    <div className="categories">
      <ViewsList/>
      <Filters/>
    </div>
  )
}

export default Categories;