import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";
import { Skeleton } from '@mui/material';


const ProductList = ({products}) =>{
    
    return(
        <section className="product-list">
            {
                products ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product}/>
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