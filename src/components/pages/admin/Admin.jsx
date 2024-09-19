import './admin.scss'
import {useProductsCategories} from "../../../context/ProductsCategoriesContext.jsx";
import {useEffect} from "react";
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../layout/header/AdminHeader.jsx';

const Admin = () => {
    const { products, categories, isLoading, fetchData} = useProductsCategories()

    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(false);
        }
    }, [products, categories]);
    
    return (
        <div className="admin-container">
            <AdminHeader />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Admin