import './admin.scss'
import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import Header from "../../layout/header/Header.jsx";
import { Outlet } from 'react-router-dom';

const Admin = () => {
    const { products, categories, isLoading, fetchData} = useProductsCategories()

    // useEffect(() => {
    //     if ((!products || products.length === 0) && !isLoading) {
    //         fetchData(false);
    //     }
    // }, [products, categories]);
    
    return (
        <div className="admin-container">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Admin