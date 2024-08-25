import './categoryBar.scss'
import {useState} from "react";

const CategoryBar = ( {categories, filterProductsByCategory} ) =>{
    const [actuaCategory, setActuaCategory] = useState('todos')

    const selectCategory = (category) =>{
        filterProductsByCategory(category)
        setActuaCategory(category)
    }

    return(
        <div className="category-bar">
            <div className="category-slider">
                <button
                    className={actuaCategory == 'todos' ? 'category-btn active' : 'category-btn'} o
                    nClick={() => selectCategory('todos')}
                >Todos</button>
                {
                    categories &&
                    categories.map(category =>
                        <button
                            className={actuaCategory == category ? 'category-btn active' : 'category-btn'}
                            key={category}
                            onClick={() => selectCategory(category)}
                        >{category}</button>
                    )
                }
            </div>
        </div>
    )
}

export default CategoryBar