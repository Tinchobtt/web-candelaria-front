import './cartSummary.scss'
import { useCart } from "../../../context/CartContext"
import RedirectButton from "../redirectButton/RedirectButton";

const CartSummary = () => {
    const {cart, totalPrice} = useCart()

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const formattedTotalPrice = formatter.format(totalPrice);

    return (
        <section className="cart-summary">
            <div className="cart-summary-info">
                <span className='summary-quantity'>{cart.length} Productos</span>
                <span className='summary-price'>{formattedTotalPrice}</span>
            </div>
            <RedirectButton link={'/carrito'} variant={'contained'}>Ver mi pedido</RedirectButton>
        </section>
    )
}

export default CartSummary