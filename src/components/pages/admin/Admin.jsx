import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";

const Admin = () => {
    const { products, categories, isLoading, filterProductsByCategory, fetchData} = useProductsCategories()

    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(false);
        }
    }, [products]);

    return (
        <main>

        </main>
    )
}

export default Admin
