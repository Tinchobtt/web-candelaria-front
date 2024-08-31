import './productCard.scss'
import { toast } from 'sonner'
import { useCart } from '../../../context/CartContext'
import { formattedPrice } from '../../../utils/numberFormater'
import { Button } from '@mui/material'
import { useTime } from '../../../context/TimeContext'

const ProductCard = ({product}) => {
    const {addToCart} = useCart()
    const {isOpen} = useTime()

    const addToCartAction = () => {
        addToCart(product)
        toast.success("Se agrego un producto al carrito", {
            style: {background: 'black', color: 'white'},
            duration: 1500,
            position: "top-center"
        });
    }
    const discount = () => product.actualPrice > 0
    let open = false
    return(
        <div className="product-card">
            <div className="product-img">
                <img src={product.image} alt={product.title}/>
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
                <Button className="product-add" onClick={addToCartAction} disabled={isOpen ? false : true}>+</Button>
            </div>
        </div>
    )
}

export default ProductCard