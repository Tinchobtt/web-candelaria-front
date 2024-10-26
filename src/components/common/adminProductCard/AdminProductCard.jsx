import './adminProductCard.scss'
import { formattedPrice } from '../../../utils/numberFormater'
import StateCircle from '../stateCircle/StateCircle'
import { FaEdit } from "react-icons/fa";
import { useModal } from '../../../context/ModalContext';

const AdminProductCard = ({product}) => {
    const { openModal } = useModal()
    const discount = () => product.actualPrice !== product.price

    const handleEditProduct = (product) => {        
        openModal('modalProducto', product); 
    };

    return(
        <div className="product-card-admin">
            <div className="product-img">
                <img src={product.image} alt={product.title}/>
            </div>
            <StateCircle state={product.active} />
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
            </div>
            <FaEdit className='edit-btn' onClick={() => handleEditProduct(product)}/>
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
            </div>
        </div>
    )
}

export default AdminProductCard