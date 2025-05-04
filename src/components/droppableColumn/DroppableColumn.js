import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const DroppableColumn = ({children, id, items, columnClass}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`column ${columnClass}`}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
}

export default DroppableColumn;