import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";


const ProductList = ({products}) =>{
    return(
        <section className="product-list">
            {
                products &&
                products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </section>
    )
}

export default ProductList