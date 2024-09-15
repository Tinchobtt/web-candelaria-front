import { useSortable } from '@dnd-kit/sortable'
import './categoryButton.scss'
import { CSS } from '@dnd-kit/utilities'
const CategoryButton = ({category, actualCategory, selectCategory}) => {

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
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={actualCategory === category.name ? 'category-btn active' : 'category-btn'}
            key={category.id}
            onClick={() => selectCategory(category.name)}
        >{category.name}
        </button>
    )
}

export default CategoryButton