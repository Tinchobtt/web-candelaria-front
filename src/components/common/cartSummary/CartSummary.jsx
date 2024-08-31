import './cartSummary.scss'
import { useCart } from "../../../context/CartContext"
import RedirectButton from "../redirectButton/RedirectButton";
import { formattedPrice } from '../../../utils/numberFormater';

const CartSummary = () => {
    const {cart, totalPrice} = useCart()

    return (
        <section className="cart-summary">
            <div className="cart-summary-info">
                <span className='summary-quantity'>{cart.length} Productos</span>
                <span className='summary-price'>{formattedPrice(totalPrice)}</span>
            </div>
            <RedirectButton link={'/carrito#start'} variant={'contained'}>Ver mi pedido</RedirectButton>
        </section>
    )
}

export default CartSummary