import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const ProdcutsCategoriesContext = createContext()

export const ProdcutsCategoriesProvider = ( {children} ) => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [active, setActive] = useState(true);

    const fetchData = async () => {
        if (products && categories) {
            // Solo hacemos la petición si los datos no están disponibles para el valor actual de active.
            if (
                (active && products.some(product => product.active)) ||
                (!active && products.some(product => !product.active))
            ) {
                return;
            }
        }

        setIsLoading(true);
        setHasError(false); // Resetear el error antes de hacer la nueva petición

        try {
            // const [productsResponse, categoriesResponse] = await Promise.all([
            //   axios.get(`/api/products?active=${active}`),
            //   axios.get(`/api/categories?active=${active}`)
            // ]);
            const [productsResponse, categoriesResponse] = await Promise.all([
                axios.get(`https://fakestoreapi.com/products`), // Obtener productos
                axios.get(`https://fakestoreapi.com/products/categories`) // Obtener categorías
            ]);
            setProducts(productsResponse.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            setHasError(true);
            console.error('Error fetching products or categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [active]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const filterProductsByCategory = (category) => {
        if (!category) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    return (
        <ProdcutsCategoriesContext.Provider value={{ products: filteredProducts, categories, isLoading, hasError, active, setActive, filterProductsByCategory }}>
            {children}
        </ProdcutsCategoriesContext.Provider>
    )
}

export const useProductsCategories = ()=> useContext(ProdcutsCategoriesContext)