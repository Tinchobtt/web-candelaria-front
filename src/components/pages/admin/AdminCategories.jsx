import './adminCategories.scss';
import { closestCenter, DndContext, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext";
import { createCategory, updateCategory, deleteCategory, updateCategories, getCategories } from '../../../services/categoryService';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import CategoryButton from '../../common/categoryButton/CategoryButton';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const AdminCategories = () => {
    const [ categories, setCategories ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ categoriesBU, setCategoriesBU ] = useState()

    const {setHasFetchedAdmin} = useProductsCategories()

    const pointerSensor = useSensor(PointerSensor)
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { distance: 10 }
    });

    const isTouchDevice = 'ontouchstart' in window
    const sensors = isTouchDevice ? [touchSensor] : [pointerSensor]

    const edit = () => {
        setCategoriesBU(categories)
        setIsEditing(true)
    }

    const handleDrag = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = categories.findIndex((category) => category.id === active.id)
            const newIndex = categories.findIndex((category) => category.id === over.id)
            const newOrder = arrayMove(categories, oldIndex, newIndex);

            setCategories(reindexCategories(newOrder))
        }
    };

    const sortByPosition = (categories) => {
        return categories.sort((a, b) => a.position - b.position);
    };

    const reindexCategories = (categories) => {
        return categories.map((category, id) => ({
            ...category,
            position: id
        }));
    };

    const saveDrag =( async () => {
        try{
            const response = await updateCategories(categories)
            if(response.status === 200){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Categoria actualizada",
                    showConfirmButton: false,
                    timer: 1500
                });
                setHasFetchedAdmin(false)
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.data.message,
                    confirmButtonText: 'Cerrar'
                });
            }
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#1975d1'
            });
        }
        setIsEditing(false);
    });

    const cancelDrag = (() => {
        setCategories(categoriesBU);
        setIsEditing(false);
    });

    const handleDeleteCategory = (id) => {
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
                try{
                    const response = await deleteCategory(id)
                    if(response.status === 200){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Categoria eliminada",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const updatedCategories = categories.filter(category => category.id !== id);
                        setHasFetchedAdmin(false)
                        setCategories(reindexCategories(updatedCategories));
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            confirmButtonText: 'Cerrar'
                        });
                    }
                }catch(error){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#1975d1'
                    });
                }
            }
        })
    };

    const handleAddCategory = (position) => {
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
                    name: result.value,
                    position: position
                };

                try{
                    const response = await createCategory(newCategory)

                    if(response.status === 200){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Categoria creada",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        const updatedCategories = [
                            ...categories.slice(0, position),
                            response.data,
                            ...categories.slice(position)
                        ];
                        setHasFetchedAdmin(false)
                        setCategories(reindexCategories(updatedCategories));
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            confirmButtonText: 'Cerrar'
                        });
                    }
                }catch(error){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#1975d1'
                    });
                }
            }
        });
    };

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
                let updatedCategory = {...category, name: result.value}
                try{
                    const response = await updateCategory(category.id, updatedCategory)
                    if(response.status === 200){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Categoria actualizada",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const updatedCategories = categories.map(cat =>
                            cat.id === category.id ? { ...cat, name: result.value } : cat
                        );
                        setHasFetchedAdmin(false)
                        setCategories(updatedCategories);
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            confirmButtonText: 'Cerrar'
                        });
                    }
                }catch(error){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#1975d1'
                    });
                }
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const categoriesResponse = await getCategories()
            setCategories(sortByPosition(categoriesResponse.data))
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return (
        <>
            {categories && !isLoading && (
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
                                <span>
                                Presione y mantenga una categoría para arrastrarla a una nueva posición, luego suelte para reorganizar
                            </span>
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