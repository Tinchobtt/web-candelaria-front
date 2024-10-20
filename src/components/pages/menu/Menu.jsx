import './menu.scss';
import { useEffect } from 'react';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import Carta from '../../common/carta/Carta';
import MenuCard from '../../common/menuCard/MenuCard';
import { Backdrop, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';

const Menu = () => {
    const { products, categories, isLoading, fetchMenuData } = useProductsCategories();

    const groupProductsByCategory = (categories, products) => {
        const categoriesWithProducts = [];
        
        categories.forEach(category => {
            const productsInCategory = products.filter(product => product.category === category.name);
            const categoryWithProducts = {
                id: category.id,
                category: category.name,
                products: productsInCategory
            };
            categoriesWithProducts.push(categoryWithProducts);
        });
        
        return categoriesWithProducts;
    }

    useEffect(()=>{
        fetchMenuData()
    },[])
    
    return (
        <>
        <Helmet>
            <title>Menú</title>
            <meta name="robots" content="index, follow" />
        </Helmet>
        {
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
