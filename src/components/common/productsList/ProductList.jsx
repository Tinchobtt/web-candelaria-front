import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";
import { Skeleton } from '@mui/material';


const ProductList = ({products, admin}) =>{
    
    return(
        <section className="product-list">
            {
                products ? (
                    products.map(product => (
                      admin ? (
                          <div key={product.id}>hola</div>
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