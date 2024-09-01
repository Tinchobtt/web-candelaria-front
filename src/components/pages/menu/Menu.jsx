import './menu.scss';
import { useEffect } from 'react';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import Carta from '../../common/carta/Carta';
import MenuCard from '../../common/menuCard/MenuCard';

const Menu = () => {
    const {products, categories, isLoading, fetchData, groupProductsByCategory} = useProductsCategories()

    useEffect(() => {
        if ((!products || products.length === 0) && !isLoading) {
            fetchData(true);//True para traer productos activos solamente
        }
    }, [products, categories]);

    return (
        <main id="main-menu">
            <Carta title="Menú">
                <div className="menu-sections-container">
                    {
                        categories && products && (
                            groupProductsByCategory(categories, products).map( info => {
                                return <MenuCard key={info.category} content={info}/>
                            })
                        )
                    }
                </div>
            </Carta>
        </main>
    )
}

export default Menu