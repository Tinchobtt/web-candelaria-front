import { createContext, useContext, useState } from "react"

const ProductsCategoriesContext = createContext()

export const ProdcutsCategoriesProvider = ({ children }) => {
    const [menuProducts, setMenuProducts] = useState([]);
    const [ecomProducts, setEcomProducts] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);
    
    const [menuCategories, setMenuCategories] = useState([]);
    const [ecomCategories, setEcomCategories] = useState([]);
    const [adminCategories, setAdminCategories] = useState([]);

    const [hasFetchedMenu, setHasFetchedMenu] = useState(false)
    const [hasFetchedEcom, setHasFetchedEcom] = useState(false)
    const [hasFetchedAdmin, setHasFetchedAdmin] = useState(false)
    const [hasFetchedCategoriesAdmin, setHasFetchedCategoriesAdmin] = useState(false)

    return (
        <ProductsCategoriesContext.Provider value={{
            // Productos
            menuProducts,
            setMenuProducts,
            ecomProducts,
            setEcomProducts,
            adminProducts,
            setAdminProducts,
            
            // Categorías
            menuCategories,
            setMenuCategories,
            ecomCategories,
            setEcomCategories,
            adminCategories,
            setAdminCategories,

            // Estados de carga
            hasFetchedMenu,
            setHasFetchedMenu,
            hasFetchedEcom,
            setHasFetchedEcom,
            hasFetchedAdmin,
            setHasFetchedAdmin,
            hasFetchedCategoriesAdmin,
            setHasFetchedCategoriesAdmin,
        }}>
            {children}
        </ProductsCategoriesContext.Provider>
    )
}

export const useProductsCategories = () => useContext(ProductsCategoriesContext)