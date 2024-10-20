import './productCard.scss'
import { toast } from 'sonner'
import { useCart } from '../../../context/CartContext'
import { formattedPrice } from '../../../utils/numberFormater'
import { Button, Skeleton } from '@mui/material'
import { useTime } from '../../../context/TimeContext'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({product}) => {
    const {addToCart} = useCart()
    const {isOpen} = useTime()
    const [isImageLoaded, setImageLoaded] = useState(false);

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
            addToCart(product)
            toast.success("Se agrego un producto al carrito", {
                style: {background: 'black', color: 'white'},
                duration: 1500,
                position: "top-center"
            });
        }
    }
    const discount = () => product.actualPrice !== product.price

    return(
        <div className="product-card">
            <div className="product-img">
                {isImageLoaded ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        onLoad={() => setImageLoaded(true)}
                    />
                ) : (
                    <Skeleton variant='rounded' width={'100%'} height={'80%'} />
                )}
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