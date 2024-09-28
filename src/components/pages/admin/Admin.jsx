import './admin.scss';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext.jsx";
import { useEffect } from "react";
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../layout/header/AdminHeader.jsx';

const Admin = () => {
    const { filteredProducts: products, categories, isLoading, fetchData } = useProductsCategories();

    // Verificamos si los productos y categorías ya han sido cargados (aunque estén vacíos)
    const hasFetchedData = products !== null && categories !== null;

    useEffect(() => {
        // Solo hacemos la petición si los datos no han sido cargados y no estamos cargando actualmente
        if (!hasFetchedData && !isLoading) {
            fetchData(false); // False para traer productos inactivos
        }
    }, [hasFetchedData, isLoading, fetchData]);

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