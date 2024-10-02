import './ecommerce.scss';
import Swal from 'sweetalert2';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext.jsx";
import { useEffect, useState } from "react";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from "../../common/productsList/ProductList.jsx";
import CartSummary from "../../common/cartSummary/CartSummary.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import { useTime } from '../../../context/TimeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Ecommerce = () => {
    const { filteredProducts: products, categories, isLoading, filterProductsByCategory, fetchData, actualCategory } = useProductsCategories();
    const { cart } = useCart();
    const { isOpen } = useTime();
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);
    
    // Verificamos si los productos y categorías ya han sido cargados (aunque estén vacíos)
    const hasFetchedData = products !== null && categories !== null;

    useEffect(() => {
        if (!isOpen && !alertShown) {
            setAlertShown(true);
            setTimeout(() => {
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
            }, 500);
        }

        // Solo hacemos la petición si los datos no han sido cargados y no estamos cargando actualmente
        if (!hasFetchedData && !isLoading) {
            fetchData(true);
        }
    }, [hasFetchedData]);

    return (
        <div className="expandenContainer">
            <main id="main-ecommerce" style={{ backgroundColor: 'var(--paper)', position: 'relative' }}>
                { !isOpen &&
                    <div className="localClose">
                        <span>Local Cerrado</span>
                    </div>
                }
                <CategoryBar 
                    categories={categories} 
                    filterProductsByCategory={filterProductsByCategory} 
                    actualCategory={actualCategory} 
                />
                <ProductList products={products} admin={false} />
                {
                    cart.length > 0 &&
                    <CartSummary />
                }
            </main>
        </div>
    );
};

export default Ecommerce;
