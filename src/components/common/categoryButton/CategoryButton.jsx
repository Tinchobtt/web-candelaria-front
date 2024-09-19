import './categoryButton.scss'
import { useSortable } from '@dnd-kit/sortable'
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
        <button
            style={style}
            className='category-slide-btn'
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
        {category.name}
        </button>
    )
}

export default CategoryButton