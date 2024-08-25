import './productList.scss'
import ProductCard from "../productCard/ProductCard.jsx";


const ProductList = ({products}) =>{
    return(
        <section className="product-list">
            {
                products &&
                products.map(product => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        description={product.description.slice(0, 100)}
                        price={product.price}
                        // actualPrice={product.actualPrice}
                        actualPrice={product.price}
                        // img={product.img}
                        img={product.image}
                    />
                ))
            }
        </section>
    )
}

export default ProductList