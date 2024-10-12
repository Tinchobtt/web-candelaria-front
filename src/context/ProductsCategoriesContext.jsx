import { createContext, useContext, useEffect, useState } from "react"
import { getEcommerceProducts, getMenuProducts, getProducts } from "../services/productService"
import { getCategories, getEcommerceCategories, getMenuCategories } from "../services/categoryService"

const ProductsCategoriesContext = createContext()

export const ProdcutsCategoriesProvider = ({ children }) => {
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState()
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [actualCategory, setActualCategory] = useState('todos')

    const [hasFetchedAll, setHasFetchedAll] = useState(false);
    const [hasFetchedEcom, setHasFetchedEcom] = useState(false);
    const [hasFetchedMenu, setHasFetchedMenu] = useState(false);

    const fetchAllData = async () => {
        if (hasFetchedAll) return;
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getProducts(), 
            getCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
        setHasFetchedAll(true)
    }

    const fetchMenuData = async () => {
        if (hasFetchedMenu) return;
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getMenuProducts(), 
            getMenuCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
        setHasFetchedMenu(true)
    }
    
    const fetchEcommerceData = async () => {
        if (hasFetchedEcom) return;
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getEcommerceProducts(), 
            getEcommerceCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
        setHasFetchedEcom(true)
    }

    const sortCategories = (categories) => {
        return categories.length > 0
        ? categories.sort((a, b) => a.position - b.position)
        : [];
    }

    const setProductsAndCategories = (products, categories) => {
        const sortedCategories = sortCategories(categories)
        setProducts(products.length > 0 ? products : [])
        setCategories(sortedCategories)
    }

    const filterProductsByCategory = (category) => {
        setActualCategory(category)
        if (category === 'todos') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products?.filter(product => product.category === category));
        }
    }
    
    useEffect(() => {
        if(actualCategory === 'todos'){
            setFilteredProducts(products)
        }else{
            setFilteredProducts(filteredProducts)
        }
    }, [products])

    return (
        <ProductsCategoriesContext.Provider value={{
            products,
            setProducts,
            categories,
            setCategories,
            fetchAllData,
            fetchMenuData,
            fetchEcommerceData,
            isLoading,
            filterProductsByCategory,
            filteredProducts,
            setFilteredProducts,
            actualCategory,
            setActualCategory
        }}>
            {children}
        </ProductsCategoriesContext.Provider>
    )
}

export const useProductsCategories = () => useContext(ProductsCategoriesContext)