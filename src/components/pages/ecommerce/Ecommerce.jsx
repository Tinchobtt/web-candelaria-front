import {useProductsCategories} from "../../../context/ProdcutsCategoriesContext.jsx";
import {useEffect} from "react";
import CategoryBar from "../../common/CategoryBar/CategoryBar.jsx";
import ProductList from "../../common/productsList/ProductList.jsx";

const Ecommerce = () => {
    const { products, categories, isLoading, hasError, active, setActive, filterProductsByCategory} = useProductsCategories()

    useEffect(() => {
        if (!active) {
            setActive(true);
        }
    }, [active]);

    return (
        <main id="main-ecommerce">
            <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} />
            <ProductList products={products} />
        </main>
    )
}
export default Ecommerce