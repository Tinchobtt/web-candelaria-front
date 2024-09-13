import './admin.scss'
import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import Header from "../../layout/header/Header.jsx";
import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from '../../common/productsList/ProductList.jsx';
import ModalButton from '../../common/modalButton/ModalButton.jsx';
import GenericModal from '../../common/genericModal/GenericModal.jsx';

const Admin = () => {
    const { products, categories, isLoading, filterProductsByCategory, fetchData} = useProductsCategories()

    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(false);
        }
    }, [products]);

    return (
        <div className="admin-container">
            <Header />
            <main>
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
