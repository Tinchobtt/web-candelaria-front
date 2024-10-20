import './admin.scss';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext.jsx";
import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../layout/header/AdminHeader.jsx';
import { Helmet } from 'react-helmet';

const Admin = () => {
    const { fetchAllData } = useProductsCategories();

    useEffect(()=>{
        fetchAllData()    
    }, [])

    return (
        <>
        <Helmet>
            <title>Admin</title>
            <meta name="robots" content="noindex" />
        </Helmet>
        <div className="admin-container">
            <AdminHeader />
            <main>
                <Outlet />
            </main>
        </div>
        </>
    );
};

export default Admin;