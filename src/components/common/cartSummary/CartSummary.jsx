import './cartSummary.scss'
import { useCart } from "../../../context/CartContext"
import RedirectButton from "../redirectButton/RedirectButton";
import { formattedPrice } from '../../../utils/numberFormater';

const CartSummary = () => {
    const {cart, totalPrice, totalProductsCount} = useCart()

    return (
        <div className="expanded">
            <div className="restricted">
                <div className="cart-summary">
                    <div className="cart-summary-info">
                        <span className='summary-quantity'>{totalProductsCount()} Productos</span>
                        <span className='summary-price'>{formattedPrice(totalPrice)}</span>
                    </div>
                    <RedirectButton link={'/carrito'} variant={'contained'}>Ver mi pedido</RedirectButton>
                </div>
            </div>
        </div>
    )
}

export default CartSummary