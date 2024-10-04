import './menu.scss';
import { useEffect } from 'react';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import Carta from '../../common/carta/Carta';
import MenuCard from '../../common/menuCard/MenuCard';
import { Backdrop, CircularProgress, Skeleton } from '@mui/material';

const Menu = () => {
    const { products, categories, isLoading, fetchData, groupProductsByCategory } = useProductsCategories();
    const hasFetchedData = products !== null && categories !== null;  // Verificar si los datos han sido cargados (aunque estén vacíos)

    useEffect(() => {
        if (!hasFetchedData && !isLoading) {
            fetchData(true);  // True para traer productos activos solamente
        }
    }, [hasFetchedData]);
    
    return (
        <>{
            products ? (
                <main id="main-menu">
                    <Carta title="Menú">
                        <div className="menu-sections-container">
                            {categories && products && (
                                groupProductsByCategory(categories, products).map(info => {
                                    return <MenuCard key={info.id} content={info} />
                                })
                            )}
                        </div>
                    </Carta>
                </main>
            ) : (
                <main id="main-menu">
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </main>
            )
        }</>
    );
};

export default Menu;
