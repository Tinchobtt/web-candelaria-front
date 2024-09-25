import './adminCategories.scss';
import { closestCenter, DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext";
import { createCategory, updateCategory, deleteCategory } from '../../../services/categoryService';
import { useState, useCallback } from "react";
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import CategoryButton from '../../common/categoryButton/CategoryButton';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const AdminCategories = () => {
    const { categories, setCategories } = useProductsCategories()
    const [ isEditing, setIsEditing ] = useState(false);
    const [ categoriesBU, setCategoriesBU ] = useState();
    
    const pointerSensor = useSensor(PointerSensor);
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { distance: 10 }
    });
    
    const isTouchDevice = 'ontouchstart' in window;
    const sensors = isTouchDevice ? [touchSensor] : [pointerSensor];

    const edit = () => {
        setCategoriesBU(categories)
        setIsEditing(true)
    }

    const handleDrag = useCallback((event) => {
        const { active, over } = event;
    
        if (active.id !== over.id) {
            const oldIndex = categories.findIndex((category) => category.id === active.id);
            const newIndex = categories.findIndex((category) => category.id === over.id);
            const newOrder = arrayMove(categories, oldIndex, newIndex);
    
            setCategories(reindexCategories(newOrder));
        }
    }, [categories]);
    
    const reindexCategories = (categories) => {
        return categories.map((category, id) => ({
            ...category,
            position: id
        }));
    };
    
    const saveDrag = useCallback( async () => {
        // try{
        //     const response = await updateCategory()
        // }catch(error){
        //     console.log(error);
        // }
        setIsEditing(false);
    }, []);

    const cancelDrag = (() => {
        setCategories(categoriesBU);
        setIsEditing(false);
    });

    const handleDeleteCategory = useCallback((id) => {
        Swal.fire({
            icon: "warning",
            text: "Desea eliminar esta categoria?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: '#DF0000',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // try{
                //     const response = await deleteCategory(id)
                // }catch(error){
                //     console.log(error);
                // }
                const updatedCategories = categories.filter(category => category.id !== id);
                setCategories(reindexCategories(updatedCategories));
            }
        })
    }, [categories]);

    const handleAddCategory = useCallback((position) => {
        Swal.fire({
            title: "Nueva categoria",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            confirmButtonText: "Agregar",
            confirmButtonColor: '#1975d1',
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newCategory = {
                    id: Date.now(), // Genera un ID único
                    name: result.value,
                    position: position
                };

                // try{
                //     const response = await createCategory(newCategory)
                // }catch(error){
                //     console.log(error);
                // }

                const updatedCategories = [
                    ...categories.slice(0, position),
                    newCategory,
                    ...categories.slice(position)
                ];
                
                setCategories(reindexCategories(updatedCategories));
            }
        });
    }, [categories]);

    const handleEditCategory = async (category) => {
        Swal.fire({
            text: "Editar nombre de categoria",
            input: "text",
            inputValue: category.name,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            confirmButtonText: "Agregar",
            confirmButtonColor: '#1975d1',
            
        }).then(async (result) => {
            if (result.isConfirmed) {

                const updatedCategories = categories.map(cat => 
                    cat.id === category.id ? { ...cat, name: result.value } : cat
                );
    
                setCategories(updatedCategories);
            }
        })
    }

    return (
        <>
        {categories && (            
            isEditing ? (
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDrag}
                >
                    <SortableContext
                        items={categories}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="category-admin">
                            <div className="admin-categories-container">
                                {
                                    categories.map( category =>
                                        <div className='admin-category-item' key={category.id}>
                                            <CategoryButton category={category}/>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="admin-category-control">
                                <Button onClick={cancelDrag} variant='contained'>Cancelar</Button>
                                <Button onClick={saveDrag} variant='contained'>Guardar</Button>
                            </div>
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div className="category-admin">
                    <div className="admin-categories-container">
                        <button className='category-add-btn' onClick={() => handleAddCategory(0)}>+</button>
                        {
                            categories.map((category, index) =>
                                <div className='admin-category-item' key={category.id}>
                                    <CategoryButton category={category} />
                                    <button className='category-delete-btn' onClick={() => handleDeleteCategory(category.id)}>
                                        <MdOutlineDeleteOutline />
                                    </button>
                                    <button className='category-edit-btn' onClick={() => handleEditCategory(category)}>
                                        <MdEdit />
                                    </button>
                                    <button className='category-add-btn' onClick={() => handleAddCategory(index + 1)}>+</button>
                                </div>
                            )
                        }
                    </div>
                    <div className="admin-category-control">
                        <Button onClick={edit} variant='contained'>Editar orden</Button>
                    </div>
                </div>
            )
        )}
        </>
    );
}

export default AdminCategories;
