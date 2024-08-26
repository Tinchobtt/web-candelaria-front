import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";


const ProductList = ({products}) =>{
    return(
        <section className="product-list">
            {
                products &&
                products.map(product => (
                    <ProductCard
                        key={product.title}
                        title={product.title}
                        description={product.description.slice(0, 100)}
                        price={product.price}
                        actualPrice={product.actualPrice}
                        img={product.image}
                    />
                ))
            }
        </section>
    )
}

export default ProductList