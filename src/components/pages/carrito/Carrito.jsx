import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import { formattedPrice } from '../../../utils/numberFormater'
import CartProductCard from '../../common/cartProductCard/CartProductCard'
import ModalButton from '../../common/modalButton/ModalButton'
import './carrito.scss'
import { useEffect } from 'react'

const Carrito = () => {
    const {cart, totalPrice} = useCart()
    const navigate = useNavigate()

    useEffect(() => {
      if (cart.length === 0) {
        navigate('/ecommerce#start');
      }
    }, [cart.length]);

    return (
        <main id="main-carrito">
            <h2 className="carrito-title">Tu pedido</h2>
            <section className='cart-prodcuts-container'>
            {
                cart.map( item => <CartProductCard key={item.id} product={item} />)
            }
            </section>
            <div className="cart-checkout">
                <span>TOTAL {formattedPrice(totalPrice)}</span>
                <ModalButton name="modalPedido">Continuar</ModalButton>
            </div>
        </main>
    )
}
export default Carrito