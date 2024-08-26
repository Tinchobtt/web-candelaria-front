import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from "../../common/productsList/ProductList.jsx";

const Ecommerce = () => {
    const { products, categories, isLoading, active, setActive, filterProductsByCategory, fetchData} = useProductsCategories()

    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(true);
        }
    }, [products, active]);

    return (
        <main id="main-ecommerce" style={{backgroundColor: 'var(--paper)'}}>
            <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} />
            <ProductList products={products}/>
        </main>
    )
}
export default Ecommerce