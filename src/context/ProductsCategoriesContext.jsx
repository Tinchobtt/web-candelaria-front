import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

const ProductsCategoriesContext = createContext();

export const ProdcutsCategoriesProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [actualCategory, setActualCategory] = useState('todos')

    const fetchData = async (activeValue, inMenu, inEcommerce) => {
        setIsLoading(true);
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                getProducts(activeValue, inMenu, inEcommerce), 
                getCategories(activeValue, inMenu, inEcommerce)
            ]);
    
            const sortedCategories = categoriesResponse.data.length > 0
                ? categoriesResponse.data.sort((a, b) => a.position - b.position)
                : [];
    
            setProducts(productsResponse.data.length > 0 ? productsResponse.data : []);
            setCategories(sortedCategories);
    
        } catch (error) {
            console.error("Error fetching products or categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterProductsByCategory = (category) => {
        setActualCategory(category)
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
    
    useEffect(() => {
        if(actualCategory === 'todos'){
            setFilteredProducts(products);
        }else{
            setFilteredProducts(filteredProducts);
        }
    }, [products]);

    return (
        <ProductsCategoriesContext.Provider value={{
            products,
            setProducts,
            categories,
            setCategories,
            isLoading,
            filterProductsByCategory,
            filteredProducts,
            setFilteredProducts,
            groupProductsByCategory,
            fetchData,
            actualCategory,
            setActualCategory
        }}>
            {children}
        </ProductsCategoriesContext.Provider>
    );
};

export const useProductsCategories = () => useContext(ProductsCategoriesContext);