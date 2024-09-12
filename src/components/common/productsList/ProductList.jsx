import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";
import { Skeleton } from '@mui/material';
import AdminProductCard from '../adminProductCard/AdminProductCard.jsx';


const ProductList = ({products, admin}) =>{
    
    return(
        <section className="product-list">
            {
                products ? (
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