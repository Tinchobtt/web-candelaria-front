import { useSortable } from '@dnd-kit/sortable'
import './categoryButton.scss'
import { CSS } from '@dnd-kit/utilities'
const CategoryButton = ({category}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: category.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            type='button'
        >
            <button className='category-slide-btn'>{category.name}</button>
        </div>
    )
}

export default CategoryButton