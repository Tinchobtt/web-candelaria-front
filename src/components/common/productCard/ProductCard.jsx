import './productCard.scss'
import { toast } from 'sonner'
import { useCart } from '../../../context/CartContext'
import { formattedPrice } from '../../../utils/numberFormater'
import { Button } from '@mui/material'
import { useTime } from '../../../context/TimeContext'
import Swal from 'sweetalert2'
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({product}) => {
    const {totalProductsCount, addToCart} = useCart()
    const {isOpen} = useTime()

    const addToCartAction = () => {
        if (!isOpen){
            Swal.fire({
                title: 'Local cerrado!',
                color: "var(--red)",
                confirmButtonColor: 'black',
                confirmButtonText: 'Ver Horarios',
                showCloseButton: true
            })
        }else{            
            if(totalProductsCount() < 20){
                addToCart(product)
                toast.success("Se agrego un producto al carrito", {
                    style: { color: 'var(--green)'},
                    duration: 1500,
                    position: "top-center"
                });
            }else{
                toast.error("El carrito esta lleno", {
                    style: { color: 'var(--red)'},
                    duration: 1500,
                    position: "top-center"
                });
            }
        }
    }
    const discount = () => product.actualPrice !== product.price

    return(
        <div className="product-card">
            <div className="product-img">
                <img
                    src={product.image}
                    alt={product.title}
                    loading='lazy'
                />
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
                <Button className={isOpen ? "product-add" : "product-add close"} onClick={addToCartAction}><FaCartPlus /></Button>
            </div>
        </div>
    )
}

export default ProductCard