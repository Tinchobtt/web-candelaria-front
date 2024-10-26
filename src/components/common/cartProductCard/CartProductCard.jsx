import { formattedPrice } from '../../../utils/numberFormater'
import QuantitySelector from '../quantitySelector/QuantitySelector'
import './cartProductCard.scss'

const CartProductCard = ({product}) => {
    const discount = () => product.actualPrice > 0

  return (
    <div className='cart-product-card'>
        <div className="product-img">
            <img src={product.image} alt={product.title}/>
        </div>
        <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{discount() ? formattedPrice(product.actualPrice * product.quantity) : formattedPrice(product.price * product.quantity)}</p>
        </div>
        <QuantitySelector item={product}/>
    </div>
  )
}

export default CartProductCard