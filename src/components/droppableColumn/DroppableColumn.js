import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const DroppableColumn = ({children, id, items}) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <div ref={setNodeRef} className="column">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  )
}



export default DroppableColumn;