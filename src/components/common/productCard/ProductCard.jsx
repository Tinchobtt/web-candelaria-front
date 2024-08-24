import './productCard.scss'
const ProductCard = ({title, description, price, actualPrice, img}) => {
    return(
        <div className="product-card">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-content">
                <h3 className="product-title">{title}</h3>
                <p className="product-desc">{description}</p>
                <div className="product-price-container">
                    <div className="product-actual-price">
                        <span>$</span>{actualPrice}
                    </div>
                    <div className="product-real-price">
                        <span>$</span>{price}
                    </div>
                </div>
            </div>
            <div className="product-control">
                <button className="product-add">+</button>
            </div>
        </div>
    )
}

export default ProductCard