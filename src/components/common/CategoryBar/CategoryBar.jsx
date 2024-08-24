const CategoryBar = ( {categories, filterProductsByCategory} ) =>{
    return(
        <>
            <button onClick={() => filterProductsByCategory()}>Todos</button>
            {

                categories.map(category =>
                    <button key={category} onClick={() => filterProductsByCategory(category)}>{category}</button>
                )
            }
        </>
    )
}

export default CategoryBar