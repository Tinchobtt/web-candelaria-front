import './admin.scss';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext.jsx";
import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../layout/header/AdminHeader.jsx';

const Admin = () => {
    const { fetchData } = useProductsCategories();

    useEffect(() => {
        fetchData(true, true, false)
    }, [])

    return (
        <div className="admin-container">
            <AdminHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Admin;