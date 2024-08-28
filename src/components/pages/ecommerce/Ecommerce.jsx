import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from "../../common/productsList/ProductList.jsx";
import { Toaster } from "sonner";
import CartSummary from "../../common/cartSummary/CartSummary.jsx";
import { useCart } from "../../../context/CartContext.jsx";

const Ecommerce = () => {
    const { products, categories, isLoading, active, setActive, filterProductsByCategory, fetchData} = useProductsCategories()
    const {cart} = useCart()
    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(true);
        }
    }, [products, active]);
    
    return (
        <main id="main-ecommerce" style={{backgroundColor: 'var(--paper)'}}>
            <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} />
            <ProductList products={products}/>
            <Toaster />
            {
                cart.length > 0 &&
                <CartSummary />
            }
        </main>
    )
}
export default Ecommerce