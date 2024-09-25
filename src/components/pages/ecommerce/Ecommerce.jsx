import './ecommerce.scss'
import Swal from 'sweetalert2'
import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect, useState} from "react";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from "../../common/productsList/ProductList.jsx";
import CartSummary from "../../common/cartSummary/CartSummary.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import { useTime } from '../../../context/TimeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Ecommerce = () => {
    const { filteredProducts: products, categories, isLoading, filterProductsByCategory, fetchData, actualCategory} = useProductsCategories()
    const { cart } = useCart()
    const { isOpen } = useTime()
    const navigate = useNavigate()
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if(!isOpen && !alertShown ){
            setAlertShown(true);
            setTimeout(()=>{
                Swal.fire({
                    title: 'Local cerrado!',
                    color: "var(--red)",
                    confirmButtonColor: 'black',
                    confirmButtonText: 'Ver Horarios',
                    showCloseButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                        setTimeout(() => {
                            const element = document.getElementById('contacto');
                            if (element) {
                                element.scrollIntoView();
                            }
                        }, 300);
                    }
                });
            }, 500)
        }

        if ((!products || products.length === 0) && !isLoading) {
            fetchData(true);
        }
    }, [products]);
    
    
    return (
        <div className="expandenContainer">
            <main id="main-ecommerce" style={{backgroundColor: 'var(--paper)', position: 'relative'}}>
                <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} actualCategory={actualCategory}/>
                <ProductList products={products} admin={false}/>
                {
                    cart.length > 0 &&
                    <CartSummary />
                }
            </main>
        </div>
    )
}
export default Ecommerce