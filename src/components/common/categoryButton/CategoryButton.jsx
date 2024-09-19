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
        <button
            className='category-slide-btn'
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
        {category.name}
        </button>
    )
}

export default CategoryButton