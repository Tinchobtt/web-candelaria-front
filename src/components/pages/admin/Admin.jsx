import './admin.scss'
import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import Header from "../../layout/header/Header.jsx";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from '../../common/productsList/ProductList.jsx';
import ModalButton from '../../common/modalButton/ModalButton.jsx';
import GenericModal from '../../common/genericModal/GenericModal.jsx';
import CategoryBarAdmin from '../../common/categoryBar/CategoryBarAdmin.jsx';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { products, categories, isLoading, filterProductsByCategory, fetchData} = useProductsCategories()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al login
            navigate('/login');
        }

        if ((!products || products.length === 0) && !isLoading) {
            fetchData(false);
        }
    }, [products, categories]);

    return (
        <div className="admin-container">
            <Header />
            <main>
                <CategoryBarAdmin categories={categories} filterProductsByCategory={filterProductsByCategory} />
                <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory}/>
                <ProductList products={products} admin={true} />
                <div className="add-btn-container">
                    <ModalButton name="modalProducto">Agregar producto</ModalButton>
                </div>
                <GenericModal />
            </main>
        </div>
    )
}

export default Admin
