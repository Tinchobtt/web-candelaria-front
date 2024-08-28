import { toast } from 'sonner'
import { useCart } from '../../../context/CartContext'
import './productCard.scss'
import { formattedPrice } from '../../../utils/numberFormater'

const ProductCard = ({product}) => {
    const {cart, addToCart} = useCart()

    const addToCartAction = () => {
        addToCart(product)
        toast.success("Se agrego un producto al carrito", {
            style: {background: 'black'},
            duration: 1500
        });
    }
    const discount = () => product.actualPrice > 0
    
    return(
        <div className="product-card">
            <div className="product-img">
                <img src={product.img} alt={product.title}/>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
            </div>
            <div className="product-card-bottom">
                <div className="product-price-container">
                    <div className="product-actual-price">
                        <span>{discount() ? formattedPrice(product.actualPrice) : formattedPrice(product.price)}</span>
                    </div>
                    <div className="product-real-price">
                        {
                            discount() &&
                            <span>{formattedPrice(product.price)}</span>
                        }
                    </div>
                </div>
                <button className="product-add" onClick={addToCartAction}>+</button>
            </div>
        </div>
    )
}

export default ProductCard