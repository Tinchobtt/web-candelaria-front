import { closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import CategoryButton from '../categoryButton/CategoryButton';
import { createCategory } from '../../../services/categoryService';
import './categoryBar.scss'
import { Box, Skeleton } from '@mui/material';
import { useState} from "react";
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import Swal from 'sweetalert2'

const CategoryBarAdmin = ( {categories, filterProductsByCategory} ) =>{
    const {setCategories} = useProductsCategories()
    const [actualCategory, setActualCategory] = useState('todos')

    const selectCategory = (category) =>{
        filterProductsByCategory(category)
        setActualCategory(category)
    }
    
    const handleDrag = (event) =>{
        const {active, over} = event
        
        const oldIndex = categories.findIndex( persona => persona.id === active.id)
        const newIndex = categories.findIndex( persona => persona.id === over.id)
        const newOrder = arrayMove(categories, oldIndex, newIndex)
    
        const updatedPersonas = newOrder.map((category, id) => ({
          ...category,
          position: id
        }));
    
        setCategories(updatedPersonas);
    }

    const handleAddCategory = (position) =>{
        Swal.fire({
          title: "Categoria",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          confirmButtonText: "Agregar",
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading()
        }).then( async (result) => {
            if (result.isConfirmed) {
                const newCategory = {
                    id: 1234,
                    name: result.value,
                    position: position
                };
                const response = await createCategory(newCategory)
                
                // Insertar la nueva categoría en la posición especificada
                const updatedCategories = [
                    ...categories.slice(0, position),
                    newCategory,
                    ...categories.slice(position)
                ];
                
                // Actualizar el índice de todas las personas
                const reindexedCategories = updatedCategories.map((category, id) => ({
                    ...category,
                    position: id
                }));
                
                setCategories(reindexedCategories);
            }
        });
    }

    return(
        <DndContext 
            collisionDetection={closestCenter}
            onDragEnd={handleDrag}
        >
            {categories ? (
                <SortableContext
                    items={categories}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="category-bar">
                        <div className="category-slider">
                            <button className='category-add-btn' onClick={() => handleAddCategory(0)}>+</button>
                            <button
                                className={actualCategory === 'todos' ? 'category-btn active' : 'category-btn'}
                                onClick={() => selectCategory('todos')}
                            >Todos</button>
                            {
                                categories.map((category) =>
                                    <CategoryButton key={category.id} category={category} actualCategory={actualCategory} selectCategory={selectCategory} />
                                )
                            }
                        </div>
                    </div>
                </SortableContext>
            ) : (
                <Box sx={{display: 'flex', width: '100%', maxWidth: '1024px', margin: {xs: '0 1rem', md: '0 2rem'}}}>
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                <Skeleton sx={{margin: '0 2px'}} variant='rectangular' width={'100%'} height={'50px'} />
                </Box>
            )}
        </DndContext>
    )
}

export default CategoryBarAdmin
