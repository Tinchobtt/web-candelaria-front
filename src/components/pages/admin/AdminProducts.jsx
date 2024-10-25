import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from '../../common/productsList/ProductList.jsx';
import ModalButton from '../../common/modalButton/ModalButton.jsx';
import GenericModal from '../../common/genericModal/GenericModal.jsx';
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService.js";
import { getCategories } from "../../../services/categoryService.js";
import { useProductsCategories } from "../../../context/ProductsCategoriesContext.jsx";

const AdminProducts = () => {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actualCategory, setActualCategory] = useState('todos')

    const {hasFetchedAdmin, setHasFetchedAdmin, adminProducts, setAdminProducts, adminCategories, setAdminCategories} = useProductsCategories()

    const filterProductsByCategory = (category) => {
        setActualCategory(category)
        if (category === 'todos') {
            setFilteredProducts(adminProducts);
        } else {
            setFilteredProducts(adminProducts?.filter(product => product.category === category));
        }
    }

    const sortCategories = (categories) => {
        return categories.length > 0
        ? categories.sort((a, b) => a.position - b.position)
        : [];
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if (!hasFetchedAdmin){
                const [productsResponse, categoriesResponse] = await Promise.all([
                    getProducts(), 
                    getCategories()
                ])
                const sortedCategories = sortCategories(categoriesResponse.data)
                setCategories(sortedCategories)
                setFilteredProducts(productsResponse.data)
                setAdminProducts(productsResponse.data)
                setAdminCategories(sortedCategories)
                setHasFetchedAdmin(true)
            }else{
                filterProductsByCategory(actualCategory)
                setCategories(adminCategories)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [adminProducts])


    return (
        <>
        <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} actualCategory={actualCategory} isLoading={isLoading}/>
        <ProductList products={filteredProducts} admin={true} isLoading={isLoading}/>
        <div className="add-btn-container">
            <ModalButton name="modalProducto">Agregar producto</ModalButton>
        </div>
        <GenericModal />
        </>
    )
}

export default AdminProducts