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
import { Helmet } from 'react-helmet';
import { getEcommerceProducts } from '../../../services/productService.js';
import { getEcommerceCategories } from '../../../services/categoryService.js';

const Ecommerce = () => {
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actualCategory, setActualCategory] = useState('todos')

    const {hasFetchedEcom, setHasFetchedEcom, ecomProducts, setEcomProducts, ecomCategories, setEcomCategories} = useProductsCategories()

    const { cart } = useCart();
    const { isOpen } = useTime();
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);

    const filterProductsByCategory = (category) => {
        setActualCategory(category)
        if (category === 'todos') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products?.filter(product => product.category === category));
        }
    }

    const sortCategories = (categories) => {
        return categories.length > 0
            ? categories.sort((a, b) => a.position - b.position)
            : [];
    }

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

        const fetchData = async () => {
            setIsLoading(true)
            if (!hasFetchedEcom){
                const [productsResponse, categoriesResponse] = await Promise.all([
                    getEcommerceProducts(),
                    getEcommerceCategories()
                ])
                setProducts(productsResponse.data)
                const sortedCategories = sortCategories(categoriesResponse.data)
                setCategories(sortedCategories)
                setFilteredProducts(productsResponse.data)
                setEcomProducts(productsResponse.data)
                setEcomCategories(sortedCategories)
                setHasFetchedEcom(true)
            }else{
                setProducts(ecomProducts)
                setFilteredProducts(ecomProducts)
                setCategories(ecomCategories)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [ecomProducts])

    return (
        <>
            <Helmet>
                <title>Armar pedido</title>
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="expandenContainer">
                {
                    ecomProducts.length === 0 ? (
                        <main id="main-ecommerce" style={{backgroundColor: 'var(--paper)', position: 'relative'}}>
                            <div className="noProducts">
                                <span>No hay productos en este momento!</span>
                            </div>
                        </main>
                    ) : (
                        <main id="main-ecommerce" style={{backgroundColor: 'var(--paper)', position: 'relative' }}>
                            {!isOpen &&
                                <div className="localClose">
                                    <span>Local Cerrado</span>
                                </div>
                            }
                            <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} actualCategory={actualCategory} />
                            <ProductList products={filteredProducts} admin={false} isLoading={isLoading}/>
                        </main>
                    )
                }
                {
                    cart.length > 0 &&
                    <CartSummary />
                }
            </div>
        </>
    );
};

export default Ecommerce;