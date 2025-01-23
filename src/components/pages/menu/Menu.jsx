import './menu.scss';
import { useEffect, useState } from 'react';
import Carta from '../../common/carta/Carta';
import MenuCard from '../../common/menuCard/MenuCard';
import { Backdrop, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import { getMenuProducts } from '../../../services/productService';
import { getMenuCategories } from '../../../services/categoryService';

const Menu = () => {
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const {hasFetchedMenu, setHasFetchedMenu, menuProducts, setMenuProducts, menuCategories, setMenuCategories} = useProductsCategories()

    const groupProductsByCategory = (categories, products) => {
        const categoriesWithProducts = [];

        categories.forEach(category => {
            const productsInCategory = products.filter(product => product.category === category.name)
            const categoryWithProducts = {
                id: category.id,
                category: category.name,
                products: productsInCategory
            };
            categoriesWithProducts.push(categoryWithProducts);
        });

        return categoriesWithProducts;
    }

    const sortCategories = (categories) => {
        return categories.length > 0
            ? categories.sort((a, b) => a.position - b.position)
            : [];
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if (!hasFetchedMenu){
                const [productsResponse, categoriesResponse] = await Promise.all([
                    getMenuProducts(),
                    getMenuCategories()
                ])
                setProducts(productsResponse.data)
                const sortedCategories = sortCategories(categoriesResponse.data)
                setCategories(sortedCategories)
                setMenuProducts(productsResponse.data)
                setMenuCategories(sortedCategories)
                setHasFetchedMenu(true)
            }else{
                setProducts(menuProducts)
                setCategories(menuCategories)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return (
        <>
            <Helmet>
                <title>Menú</title>
                <meta name="robots" content="index, follow" />
            </Helmet>
            {
                products ? (
                    products.length > 0 ?(
                        <main id="main-menu">
                            <Carta title="Menú">
                                <div className="menu-sections-container">
                                    {categories && products && (
                                        groupProductsByCategory(categories, products).map(info => {
                                            return <MenuCard key={info.id} content={info}/>
                                        })
                                    )}
                                </div>
                            </Carta>
                        </main>
                    ) : (
                        <main id="main-menu">
                            <div className="noProducts">
                                <span>No hay productos en este momento!</span>
                            </div>
                        </main>
                    )
                ) : (
                    <main id="main-menu">
                        <Backdrop
                            sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                    </main>
                )
            }</>
    );
};

export default Menu;