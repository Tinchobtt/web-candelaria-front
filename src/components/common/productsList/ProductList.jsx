import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";
import { Skeleton } from '@mui/material';
import AdminProductCard from '../adminProductCard/AdminProductCard.jsx';


const ProductList = ({products, admin, isLoading}) =>{
    
    return(
        <section className="product-list">
            {
                !isLoading && products ? (
                    products.map(product => (
                      admin ? (
                          <AdminProductCard key={product.id} product={product} />
                        ) : (
                          <ProductCard key={product.id} product={product} />
                      )
                    ))
                ) : (
                <>
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                    <Skeleton variant='rectangular' width={'100%'} height={'150px'} />
                </>
                )
            }
        </section>
    )
}

export default ProductList