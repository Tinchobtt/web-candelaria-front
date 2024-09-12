import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsCategoriesContext = createContext();

export const ProdcutsCategoriesProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (activeValue) => {
        if (products && categories) {
            const someProducts = products?.some(product => product.active === activeValue);
            if (someProducts) {
                return;
            }
        }
        setIsLoading(true);

        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                axios.get(`http://localhost:8080/api/products?onlyActives=${activeValue}`),
                axios.get(`http://localhost:8080/api/categories?onlyActives=${activeValue}`)
            ]);
            const sortedCategories = categoriesResponse.data.sort((a, b) => a.position - b.position);
            setProducts(productsResponse.data);
            setCategories(sortedCategories);
            
        } catch (error) {
            console.error("Error fetching products or categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

    const filterProductsByCategory = (category) => {
        if (category === 'todos') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products?.filter(product => product.category === category));
        }
    };

    const groupProductsByCategory = (categories, products) => {
        const categoriesWithProducts = [];
        
        categories.forEach(category => {
            const productsInCategory = products.filter(product => product.category === category.name);
            const categoryWithProducts = {
                id: category.id,
                category: category.name,
                products: productsInCategory
            };
            categoriesWithProducts.push(categoryWithProducts);
        });
    
        return categoriesWithProducts;
    }

    return (
        <ProductsCategoriesContext.Provider value={{
            products: filteredProducts,
            categories,
            isLoading,
            filterProductsByCategory,
            groupProductsByCategory,
            fetchData
        }}>
            {children}
        </ProductsCategoriesContext.Provider>
    );
};

export const useProductsCategories = () => useContext(ProductsCategoriesContext);

