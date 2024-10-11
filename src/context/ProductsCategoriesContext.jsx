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

    const fetchAllData = async () => {
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getProducts(), 
            getCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
    }

    const fetchMenuData = async () => {
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getMenuProducts(), 
            getMenuCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
    }

    const fetchEcommerceData = async () => {
        setIsLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([
            getEcommerceProducts(), 
            getEcommerceCategories()
        ])
        setProductsAndCategories(productsResponse.data, categoriesResponse.data)
        setIsLoading(false)
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
            setFilteredProducts(products)
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