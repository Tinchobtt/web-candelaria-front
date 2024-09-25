import './categoryBar.scss'
import { Box, Skeleton } from '@mui/material';

const CategoryBar = ( {categories, filterProductsByCategory, actualCategory} ) =>{
    const selectCategory = (category) =>{
        filterProductsByCategory(category)
    }

    return(
        <div className="category-bar">
            {
                categories ? (
                <div className="category-slider">
                    <button
                        className={actualCategory === 'todos' ? 'category-btn active' : 'category-btn'}
                        onClick={() => selectCategory('todos')}
                    >Todos</button>
                    {categories &&
                        categories.map(category =>
                            <button
                                className={actualCategory === category.name ? 'category-btn active' : 'category-btn'}
                                key={category.id}
                                onClick={() => selectCategory(category.name)}
                            >{category.name}
                            </button>
                        )
                    }
                </div>
                ):(
                    <Box sx={{display: 'flex', width: '100%', maxWidth: '1024px', margin: {xs: '0 1rem', md: '0 2rem'}}}>
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                    </Box>
                )
            }
        </div>
    )
}

export default CategoryBar
