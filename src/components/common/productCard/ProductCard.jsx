import './productCard.scss'

const ProductCard = ({title, description, price, actualPrice, img}) => {
    return(
        <div className="product-card">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-info">
                <h3 className="product-title">{title}</h3>
                <p className="product-desc">{description}</p>
            </div>
            <div className="product-card-bottom">
                <div className="product-price-container">
                    <div className="product-actual-price">
                        <span>${actualPrice}</span>
                    </div>
                    <div className="product-real-price">
                        <span>${price}</span>
                    </div>
                </div>
                <button className="product-add">+</button>
            </div>
        </div>
    )
}

export default ProductCard