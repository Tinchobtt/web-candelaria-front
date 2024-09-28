import './menu.scss';
import { useEffect } from 'react';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import Carta from '../../common/carta/Carta';
import MenuCard from '../../common/menuCard/MenuCard';

const Menu = () => {
    const { products, categories, isLoading, fetchData, groupProductsByCategory } = useProductsCategories();
    const hasFetchedData = products !== null && categories !== null;  // Verificar si los datos han sido cargados (aunque estén vacíos)

    useEffect(() => {
        if (!hasFetchedData && !isLoading) {
            fetchData(true);  // True para traer productos activos solamente
        }
    }, [hasFetchedData, isLoading]);
    
    return (
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
    );
};

export default Menu;
