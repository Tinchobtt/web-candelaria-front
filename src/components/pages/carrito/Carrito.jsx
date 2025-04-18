import './carrito.scss'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import { formattedPrice } from '../../../utils/numberFormater'
import CartProductCard from '../../common/cartProductCard/CartProductCard'
import { useEffect } from 'react'
import RedirectButton from '../../common/redirectButton/RedirectButton'

const Carrito = () => {
    const {cart, totalPrice} = useCart()
    const navigate = useNavigate()

    useEffect(() => {
      if (cart.length === 0) {
        navigate('/ecommerce');
      }
    }, [cart.length]);

    return (
        <div className="expandenContainer">
            <main id="main-carrito">
                <h2 className="carrito-title">Tu pedido</h2>
                <section className='cart-prodcuts-container'>
                {
                    cart.map( item => <CartProductCard key={item.id} product={item} />)
                }
                </section>
                <div className="cart-checkout">
                    <span>TOTAL {formattedPrice(totalPrice)}</span>
                    <RedirectButton link={'/checkout'} variant={'contained'}>Continuar</RedirectButton>
                </div>
            </main>
        </div>
    )
}
export default Carrito